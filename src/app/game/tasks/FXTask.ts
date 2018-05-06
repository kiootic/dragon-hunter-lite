import { Group, Tween } from '@tweenjs/tween.js';
import { Game } from 'app/game';
import { PlayFX } from 'app/game/messages';
import { Task } from 'app/game/tasks';

export class FXTask extends Task {
  private readonly animTargets = new Set();
  private readonly tween = new Group();
  private elapsed = 0;

  constructor(game: Game) {
    super(game);
    this.game.messages$.ofType(PlayFX.Shake).subscribe(this.shake);
  }

  update(dt: number) {
    this.elapsed += dt;
    this.tween.update(this.elapsed);
  }

  private shake = ({ target }: PlayFX.Shake) => {
    if (target) {
      if (this.animTargets.has(target))
        return;
      this.animTargets.add(target);
      target.renderTranslation = target.renderTranslation || [0, 0];
      const offsets = [4, -4, 3, -3, 2, -2, 1, -1, 0];
      new Tween(target.renderTranslation, this.tween)
        .to({ [0]: offsets.slice(0, 4) }, 300)
        .chain(new Tween(target.renderTranslation, this.tween).to({ [0]: offsets.slice(4) }, 300))
        .onComplete(() => this.animTargets.delete(target))
        .start(this.elapsed);
    }
  }
}