import { Game } from 'app/game';
import { MenuOverlay } from 'app/game/overlays/MenuOverlay';
import { Task } from 'app/game/tasks';
import { Spatial, Stats, StatList } from 'app/game/traits';
import { StateOverlay } from 'app/states';
import { tilePerSecond } from 'common/logic/stats';
import { vec2 } from 'gl-matrix';

export class PlayerInputTask extends Task {
  private readonly vel: vec2;
  private readonly stats: Stats;
  private readonly statList: StatList;
  private readonly direction = vec2.create();

  constructor(game: Game) {
    super(game);
    this.vel = game.player.traits.get(Spatial).velocity;
    this.stats = game.player.traits.get(Stats);
    this.statList = Stats.compute(this.stats);
  }

  public update(dt: number) {
    if (Stats.canMove(this.stats)) {
      vec2.set(this.direction, 0, 0);
      if (this.game.keyboard.isPressed('a')) this.direction[0]--;
      if (this.game.keyboard.isPressed('d')) this.direction[0]++;
      if (this.game.keyboard.isPressed('w')) this.direction[1]--;
      if (this.game.keyboard.isPressed('s')) this.direction[1]++;

      vec2.normalize(this.direction, this.direction);
      vec2.scale(this.vel, this.direction, tilePerSecond(this.statList.spd));
    }

    if (this.game.keyboard.isDown('Escape')) {
      this.game.app.pushState(new StateOverlay(new MenuOverlay(this.game)));
    }
  }
}