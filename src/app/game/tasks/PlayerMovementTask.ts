import { DisplayTileSize } from 'app';
import { Game } from 'app/game/Game';
import { Task } from 'app/game/Task';
import { Spatial } from 'app/game/traits';
import { vec2 } from 'gl-matrix';

const Speed = 5;

export class PlayerMovementTask extends Task {
  private readonly playerPosition: vec2;
  private readonly vec = vec2.create();
  private readonly cameraOffset = vec2.create();

  constructor(game: Game) {
    super(game);
    this.playerPosition = game.player.traits.get(Spatial).position;
  }

  public update(dt: number) {
    vec2.set(this.vec, 0, 0);
    if (this.game.keyboard.isDown('a')) this.vec[0]--;
    if (this.game.keyboard.isDown('d')) this.vec[0]++;
    if (this.game.keyboard.isDown('w')) this.vec[1]--;
    if (this.game.keyboard.isDown('s')) this.vec[1]++;
    vec2.normalize(this.vec, this.vec);

    if (this.game.keyboard.isDown('Control')) vec2.scale(this.vec, this.vec, 10);
    vec2.scaleAndAdd(this.playerPosition, this.playerPosition, this.vec, dt / 1000 * Speed);

    vec2.scaleAndAdd(this.cameraOffset, [0, -DisplayTileSize], this.playerPosition, DisplayTileSize);
    vec2.floor(this.game.view.camera.offset, this.cameraOffset);
  }
}