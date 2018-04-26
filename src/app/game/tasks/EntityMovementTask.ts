import { Game } from 'app/game/Game';
import { TextureSprite } from 'app/game/map';
import { Task } from 'app/game/Task';
import { Spatial } from 'app/game/traits';
import * as intersect from 'app/utils/intersect';
import { vec2 } from 'gl-matrix';
import { clamp } from 'lodash';

export class EntityMovementTask extends Task {
  private readonly vel = vec2.create();

  constructor(game: Game) {
    super(game);
  }

  public update(dt: number) {
    for (const entity of this.game.entities.findTrait(Spatial)) {
      const { position, size, sprite, velocity } = entity.traits.get(Spatial);
      vec2.copy(this.vel, velocity);

      const obstacles = this.game.keyboard.isPressed('Alt') ? [] : Array.from(this.getObstacles(position));
      const shape = new intersect.AABB(
        new intersect.Point(position[0], position[1]),
        new intersect.Point(size[0], size[1]));
      this.resolve(obstacles, shape);
      vec2.set(position, shape.pos.x, shape.pos.y);

      this.updateDisplay(velocity, this.vel, sprite);
      vec2.copy(velocity, this.vel);
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
      const angle = Math.atan2(intendedVel[1], intendedVel[0]);
      if (Math.abs(angle) > Math.PI * 3 / 5)
        sprite.animName = 'left';
      else if (Math.abs(angle) < Math.PI * 2 / 5)
        sprite.animName = 'right';
      else if (angle < 0)
        sprite.animName = 'up';
      else
        sprite.animName = 'down';
    }
  }
}