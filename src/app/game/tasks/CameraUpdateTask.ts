import { DisplayTileSize } from 'app';
import { Game } from 'app/game/Game';
import { Task } from 'app/game/Task';
import { Spatial } from 'app/game/traits';
import { vec2 } from 'gl-matrix';

export class CameraUpdateTask extends Task {
  private readonly position: vec2;
  private readonly cameraOffset = vec2.create();

  constructor(game: Game) {
    super(game);
    this.position = game.player.traits.get(Spatial).position;
  }

  public update(dt: number) {
    vec2.scaleAndAdd(this.cameraOffset, [0, -DisplayTileSize], this.position, DisplayTileSize);
    vec2.floor(this.game.view.camera.offset, this.cameraOffset);
  }
}