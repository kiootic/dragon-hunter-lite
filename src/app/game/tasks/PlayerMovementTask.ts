import { DisplayTileSize } from 'app';
import { Game } from 'app/game/Game';
import { TextureSprite } from 'app/game/map';
import { Task } from 'app/game/Task';
import { Spatial } from 'app/game/traits';
import * as intersect from 'app/utils/intersect';
import { vec2 } from 'gl-matrix';
import { clamp } from 'lodash';

const Speed = 5;

export class PlayerMovementTask extends Task {
  private readonly pos: vec2;
  private readonly sprite: TextureSprite;
  private readonly direction = vec2.create();
  private readonly vel = vec2.create();
  private readonly cameraOffset = vec2.create();

  constructor(game: Game) {
    super(game);
    ({ position: this.pos, sprite: this.sprite } = game.player.traits.get(Spatial));
    this.sprite.animName = 'down';
  }

  public update(dt: number) {
    vec2.set(this.direction, 0, 0);
    if (this.game.keyboard.isDown('a')) this.direction[0]--;
    if (this.game.keyboard.isDown('d')) this.direction[0]++;
    if (this.game.keyboard.isDown('w')) this.direction[1]--;
    if (this.game.keyboard.isDown('s')) this.direction[1]++;
    vec2.normalize(this.direction, this.direction);
    if (this.game.keyboard.isDown('Control')) vec2.scale(this.direction, this.direction, 10);
    vec2.scale(this.vel, this.direction, dt / 1000 * Speed);

    const obstacles = this.game.keyboard.isDown('Alt') ? [] : Array.from(this.getObstacles());
    const shape = new intersect.AABB(
      new intersect.Point(this.pos[0], this.pos[1]),
      new intersect.Point(0.25, 0.25));
    this.resolve(obstacles, shape);

    vec2.set(this.pos, shape.pos.x, shape.pos.y);

    this.updateDisplay();
  }

  private * getObstacles() {
    const map = this.game.map;
    const lib = this.game.library;

    const left = clamp(Math.floor(Math.min(this.pos[0] + this.vel[0], this.pos[0])) - 1, 0, map.width - 1);
    const right = clamp(Math.ceil(Math.max(this.pos[0] + this.vel[0], this.pos[0])) + 1, 0, map.width - 1);
    const top = clamp(Math.floor(Math.min(this.pos[1] + this.vel[1], this.pos[1])) - 1, 0, map.height - 1);
    const bottom = clamp(Math.ceil(Math.max(this.pos[1] + this.vel[1], this.pos[1])) + 1, 0, map.height - 1);

    for (let y = top; y <= bottom; y++)
      for (let x = left; x <= right; x++) {
        const objectDef = lib.objects[map.getObject(x, y)];
        if (objectDef && objectDef.obstacle)
          yield new intersect.AABB(
            new intersect.Point(x + 0.5, y + 0.5),
            new intersect.Point(0.4, 0.4)
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

  private updateDisplay() {
    this.sprite.still = this.vel[0] === 0 && this.vel[1] === 0;
    if (this.direction[0] !== 0 || this.direction[1] !== 0) {
      const angle = Math.atan2(this.direction[1], this.direction[0]);
      if (Math.abs(angle) > Math.PI * 3 / 5)
        this.sprite.animName = 'left';
      else if (Math.abs(angle) < Math.PI * 2 / 5)
        this.sprite.animName = 'right';
      else if (angle < 0)
        this.sprite.animName = 'up';
      else
        this.sprite.animName = 'down';
    }

    vec2.scaleAndAdd(this.cameraOffset, [0, -DisplayTileSize], this.pos, DisplayTileSize);
    vec2.floor(this.game.view.camera.offset, this.cameraOffset);
  }
}