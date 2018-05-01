import { TextureSprite } from 'app/components';
import { Task } from 'app/game/tasks';
import { Float, Spatial } from 'app/game/traits';
import { direction } from 'app/utils/animations';
import * as intersect from 'app/utils/intersect';
import { vec2 } from 'gl-matrix';
import { clamp } from 'lodash';

const Gravity = -10;
const StaticThreshold = 0.5;

export class EntityMovementTask extends Task {
  private readonly vel = vec2.create();

  public update(dt: number) {
    const t = dt / 1000;
    for (const entity of this.game.entities.withTrait(Spatial)) {
      const { position, size, sprite, velocity, solid } = entity.traits.get(Spatial);
      vec2.scale(this.vel, velocity, dt / 1000);

      if (solid) {
        const obstacles = this.game.keyboard.isPressed('Alt') ? [] : Array.from(this.getObstacles(position));
        const shape = new intersect.AABB(
          new intersect.Point(position[0], position[1]),
          new intersect.Point(size[0], size[1]));
        this.resolve(obstacles, shape);
        vec2.set(position, shape.pos.x, shape.pos.y);
      } else {
        vec2.add(position, position, this.vel);
      }

      this.updateDisplay(velocity, this.vel, sprite);

      const float = entity.traits.get(Float);
      if (float && float.gravity) {
        float.z[0] += float.z[1] * t + 0.5 * Gravity * t * t;
        float.z[1] += Gravity * t;
        if (float.z[0] < StaticThreshold * 0.1) {
          vec2.set(float.z, 0, 0);
          vec2.set(velocity, 0, 0);
        }
      } else {
        if (this.vel[0] === 0) velocity[0] = 0;
        if (this.vel[1] === 0) velocity[1] = 0;
        vec2.scale(velocity, velocity, Math.pow(0.5, t));
        if (Math.abs(velocity[0]) < StaticThreshold) velocity[0] = 0;
        if (Math.abs(velocity[1]) < StaticThreshold) velocity[1] = 0;
      }
    }
  }

  private * getObstacles(position: vec2) {
    const map = this.game.map;
    const lib = this.game.library;

    const left = clamp(Math.floor(Math.min(position[0] + this.vel[0], position[0])) - 1, 0, map.width - 1);
    const right = clamp(Math.ceil(Math.max(position[0] + this.vel[0], position[0])) + 1, 0, map.width - 1);
    const top = clamp(Math.floor(Math.min(position[1] + this.vel[1], position[1])) - 1, 0, map.height - 1);
    const bottom = clamp(Math.ceil(Math.max(position[1] + this.vel[1], position[1])) + 1, 0, map.height - 1);

    for (let y = top; y <= bottom; y++)
      for (let x = left; x <= right; x++) {
        const objectDef = lib.objects[map.getObject(x, y)];
        if (objectDef && objectDef.obstacle)
          yield new intersect.AABB(
            new intersect.Point(x + 0.5, y + 0.5),
            objectDef.terrain ? new intersect.Point(0.5, 0.5) : new intersect.Point(0.4, 0.4)
          );
      }
  }

  private resolve(obstacles: intersect.AABB[], shape: intersect.AABB) {
    const handleSweep = (sweep: intersect.Sweep) => {
      if (sweep.hit && sweep.hit.time > 0) {
        const collider = sweep.hit.collider;
        if (sweep.hit.normal.x !== 0)
          sweep.pos.x = collider.pos.x + (collider.half.x + shape.half.x + intersect.EPSILON) * sweep.hit.normal.x;
        if (sweep.hit.normal.y !== 0)
          sweep.pos.y = collider.pos.y + (collider.half.y + shape.half.y + intersect.EPSILON) * sweep.hit.normal.y;

        vec2.mul(this.vel, this.vel, [1 - Math.abs(sweep.hit.normal.x), 1 - Math.abs(sweep.hit.normal.y)]);
      }
      shape.pos = sweep.pos;
    };

    const sweepX = shape.sweepInto(obstacles, new intersect.Point(this.vel[0], 0));
    const sweepY = shape.sweepInto(obstacles, new intersect.Point(0, this.vel[1]));
    const maxSweep = sweepX.time > sweepY.time ? sweepX : sweepY;
    handleSweep(maxSweep);
    const nextVel = sweepX.time > sweepY.time ? new intersect.Point(0, this.vel[1]) : new intersect.Point(this.vel[0], 0);
    const sweepFinal = shape.sweepInto(obstacles, nextVel);
    handleSweep(sweepFinal);
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