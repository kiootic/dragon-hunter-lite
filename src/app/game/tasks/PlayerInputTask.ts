import { App } from 'app';
import { Game } from 'app/game/Game';
import { MenuOverlay } from 'app/game/overlays/MenuOverlay';
import { Task } from 'app/game/Task';
import { Spatial } from 'app/game/traits';
import { StateOverlay } from 'app/states';
import { vec2 } from 'gl-matrix';

const Speed = 5;

export class PlayerInputTask extends Task {
  private readonly vel: vec2;
  private readonly direction = vec2.create();

  constructor(game: Game) {
    super(game);
    this.vel = game.player.traits.get(Spatial).velocity;
  }

  public update(dt: number) {
    vec2.set(this.direction, 0, 0);
    if (this.game.keyboard.isPressed('a')) this.direction[0]--;
    if (this.game.keyboard.isPressed('d')) this.direction[0]++;
    if (this.game.keyboard.isPressed('w')) this.direction[1]--;
    if (this.game.keyboard.isPressed('s')) this.direction[1]++;
    vec2.normalize(this.direction, this.direction);
    if (this.game.keyboard.isPressed('Control')) vec2.scale(this.direction, this.direction, 10);
    vec2.scale(this.vel, this.direction, dt / 1000 * Speed);

    if (this.game.keyboard.isDown('Escape')) {
      App.instance.pushState(new StateOverlay(new MenuOverlay(this.game)));
    }
  }
}