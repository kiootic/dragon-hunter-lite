import { TextureSprite } from 'app/components';
import { Entity } from 'app/game/entities';
import { EntityCollision, TileCollision } from 'app/game/messages';
import { Task } from 'app/game/tasks';
import { Collidable, Float, Spatial, Stats } from 'app/game/traits';
import { direction } from 'app/utils/animations';
import { AABB, EPSILON, Point, Sweep } from 'app/utils/intersect';
import { TileObject } from 'common/data';
import { vec2 } from 'gl-matrix';

const Gravity = -10;
const StaticThreshold = 0.5;
const EntitySizeExtent = 5;

function pt(x: number, y: number) { return new Point(x, y); }

interface ObjectAABB extends AABB {
  readonly obstacle: boolean;
}
class TileAABB extends AABB implements ObjectAABB {
  public readonly x: number;
  public readonly y: number;
  public readonly obstacle: boolean;

  constructor(x: number, y: number, objectDef?: TileObject) {
    super(
      pt(x + 0.5, y),
      (!objectDef || objectDef.terrain) ? pt(0.5, 0.5) : pt(0.4, 0.4)
    );
    this.x = x;
    this.y = y;
    this.obstacle = !objectDef || (!!objectDef.obstacle);
  }
}

class EntityAABB extends AABB {
  public readonly entity: Entity;
  public readonly obstacle: boolean;

  constructor(entity: Entity) {
    const { position } = entity.traits.get(Spatial);
    const { size, mass } = entity.traits.get(Collidable);
    super(pt(position[0], position[1]), pt(size[0], size[1]));
    this.entity = entity;
    this.obstacle = mass > 0;
  }
}

export class EntityMovementTask extends Task {
  private readonly vel = vec2.create();
  private readonly collisions = new Set<string>();

  public update(dt: number) {
    const t = dt / 1000;
    for (const entity of this.game.entities.withTrait(Spatial)) {
      const { position, sprite, velocity } = entity.traits.get(Spatial);
      const stats = entity.traits.get(Stats);
      vec2.scale(this.vel, velocity, dt / 1000);

      const collidable = entity.traits.get(Collidable);
      let hits: ObjectAABB[];
      if (collidable) {
        const objects = Array.from(this.getAABBs(position, entity));
        const shape = new EntityAABB(entity);
        hits = this.resolve(objects, shape);
        vec2.set(position, shape.pos.x, shape.pos.y);
      } else {
        vec2.add(position, position, this.vel);
        hits = [];
      }

      if (stats && Stats.canMove(stats))
        this.updateDisplay(velocity, this.vel, sprite);

      const float = entity.traits.get(Float);
      if (float && float.gravity) {
        float.z[0] += float.z[1] * t + 0.5 * Gravity * t * t;
        float.z[1] += Gravity * t;
        if (float.z[0] < StaticThreshold * 0.1) {
          vec2.set(float.z, 0, 0);
          vec2.set(velocity, 0, 0);
        }
      } else if (!float || float.z[0] === 0) {
        if (this.vel[0] === 0) velocity[0] = 0;
        if (this.vel[1] === 0) velocity[1] = 0;
        vec2.scale(velocity, velocity, Math.pow(0.5, t));
        if (Math.abs(velocity[0]) < StaticThreshold) velocity[0] = 0;
        if (Math.abs(velocity[1]) < StaticThreshold) velocity[1] = 0;
      }

      for (const collider of hits) {
        if (collider instanceof EntityAABB)
          this.entityCollided(entity, collider.entity);
        else if (collider instanceof TileAABB)
          this.tileCollided(entity, collider.x, collider.y);
      }
    }

    this.collisions.clear();
  }

  private * getAABBs(position: vec2, exclude: Entity) {
    const map = this.game.map;
    const lib = this.game.library;

    const left = Math.floor(Math.min(position[0] + this.vel[0], position[0])) - 1;
    const right = Math.ceil(Math.max(position[0] + this.vel[0], position[0])) + 1;
    const top = Math.floor(Math.min(position[1] + this.vel[1], position[1])) - 1;
    const bottom = Math.ceil(Math.max(position[1] + this.vel[1], position[1])) + 1;

    for (let y = top; y <= bottom; y++)
      for (let x = left; x <= right; x++) {
        const terrainDef = lib.terrains[map.getTerrain(x, y)];
        if (!terrainDef) {
          yield new TileAABB(x, y);
        }

        const objectDef = lib.objects[map.getObject(x, y)];
        if (objectDef && objectDef.collidable)
          yield new TileAABB(x, y, objectDef);
      }

    for (const entity of this.game.entities.withTrait(Collidable)) {
      if (entity === exclude) continue;

      const { position } = entity.traits.get(Spatial);
      if (
        position[0] < left - EntitySizeExtent || position[0] > right + EntitySizeExtent ||
        position[1] < top - EntitySizeExtent || position[1] > bottom + EntitySizeExtent
      )
        continue;

      yield new EntityAABB(entity);
    }
  }

  private readonly collidedAABBs = new Map<ObjectAABB, number>();
  private resolve(objects: ObjectAABB[], self: EntityAABB) {
    const performSweep = (delta: Point) => {
      let nearest = new Sweep();
      nearest.time = 1;
      nearest.pos.x = self.pos.x + delta.x;
      nearest.pos.y = self.pos.y + delta.y;
      for (const obj of objects) {
        const sweep = obj.sweepAABB(self, delta);
        if (sweep.hit && sweep.time < nearest.time) {
          this.collidedAABBs.set(obj, sweep.time);
          if (!obj.obstacle) continue;
          nearest = sweep;
        }
      }
      return nearest;
    };
    const resolveSweep = (sweep: Sweep) => {
      if (sweep.hit && sweep.hit.time > 0) {
        const collider = sweep.hit.collider;
        if (sweep.hit.normal.x !== 0)
          sweep.pos.x = collider.pos.x + (collider.half.x + self.half.x + EPSILON) * sweep.hit.normal.x;
        if (sweep.hit.normal.y !== 0)
          sweep.pos.y = collider.pos.y + (collider.half.y + self.half.y + EPSILON) * sweep.hit.normal.y;

        vec2.mul(this.vel, this.vel, [1 - Math.abs(sweep.hit.normal.x), 1 - Math.abs(sweep.hit.normal.y)]);
      } else if (sweep.hit) {
        sweep.pos.x += sweep.hit.delta.x;
        sweep.pos.y += sweep.hit.delta.y;
      }
      self.pos = sweep.pos;
    };

    let collisionTime: number;
    if (!self.obstacle) {
      // no collision resolution for non-obstacles
      const sweep = performSweep(pt(this.vel[0], this.vel[1]));
      self.pos.x += this.vel[0];
      self.pos.y += this.vel[1];
      collisionTime = sweep.time;
    } else {
      const sweepX = performSweep(pt(this.vel[0], 0));
      const sweepY = performSweep(pt(0, this.vel[1]));
      const maxSweep = sweepX.time > sweepY.time ? sweepX : sweepY;
      resolveSweep(maxSweep);
      const nextVel = sweepX.time > sweepY.time ? pt(0, this.vel[1]) : pt(this.vel[0], 0);
      const sweepFinal = performSweep(nextVel);
      resolveSweep(sweepFinal);
      collisionTime = Math.min(sweepX.time, sweepY.time);
    }

    const hit = [...this.collidedAABBs].filter(([, time]) => time <= collisionTime).map(([collider]) => collider);
    this.collidedAABBs.clear();
    return hit;
  }

  private tileCollided(entity: Entity, x: number, y: number) {
    const key = `${entity.id}:${x},${y}`;
    if (this.collisions.has(key)) return;
    this.collisions.add(key);

    this.game.dispatch(new TileCollision(entity.id, x, y));
  }
  private entityCollided(a: Entity, b: Entity) {
    const aId = Math.min(a.id, b.id), bId = Math.max(a.id, b.id);
    const key = `${aId}:${bId}`;
    if (this.collisions.has(key)) return;
    this.collisions.add(key);

    this.game.dispatch(new EntityCollision(aId, bId));
  }

  private updateDisplay(intendedVel: vec2, actualVel: vec2, sprite: TextureSprite) {
    if (!sprite.animName)
      sprite.animName = 'down';

    sprite.still = actualVel[0] === 0 && actualVel[1] === 0;

    if (intendedVel[0] !== 0 || intendedVel[1] !== 0) {
      sprite.animName = direction(intendedVel[1], intendedVel[0], 'movement');
    }
  }
}