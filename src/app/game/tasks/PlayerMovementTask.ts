import { DisplayTileSize } from 'app';
import { Game } from 'app/game/Game';
import { TextureSprite } from 'app/game/map';
import { Task } from 'app/game/Task';
import { Spatial } from 'app/game/traits';
import { vec2 } from 'gl-matrix';

const Speed = 5;

export class PlayerMovementTask extends Task {
  private readonly playerPosition: vec2;
  private readonly playerSprite: TextureSprite;
  private readonly vel = vec2.create();
  private readonly cameraOffset = vec2.create();

  constructor(game: Game) {
    super(game);
    ({ position: this.playerPosition, sprite: this.playerSprite } = game.player.traits.get(Spatial));
    this.playerSprite.animName = 'down';
  }

  public update(dt: number) {
    vec2.set(this.vel, 0, 0);
    if (this.game.keyboard.isDown('a')) this.vel[0]--;
    if (this.game.keyboard.isDown('d')) this.vel[0]++;
    if (this.game.keyboard.isDown('w')) this.vel[1]--;
    if (this.game.keyboard.isDown('s')) this.vel[1]++;
    vec2.normalize(this.vel, this.vel);

    if (this.game.keyboard.isDown('Control')) vec2.scale(this.vel, this.vel, 10);
    vec2.scaleAndAdd(this.playerPosition, this.playerPosition, this.vel, dt / 1000 * Speed);

    if (this.vel[0] === 0 && this.vel[1] === 0)
      this.playerSprite.still = true;
    else {
      const angle = Math.atan2(this.vel[1], this.vel[0]);
      if (Math.abs(angle) > Math.PI * 3 / 5)
        this.playerSprite.animName = 'left';
      else if (Math.abs(angle) < Math.PI * 2 / 5)
        this.playerSprite.animName = 'right';
      else if (angle < 0)
        this.playerSprite.animName = 'up';
      else
        this.playerSprite.animName = 'down';
      this.playerSprite.still = false;
    }

    vec2.scaleAndAdd(this.cameraOffset, [0, -DisplayTileSize], this.playerPosition, DisplayTileSize);
    vec2.floor(this.game.view.camera.offset, this.cameraOffset);
  }
}