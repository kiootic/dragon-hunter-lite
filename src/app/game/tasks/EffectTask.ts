import { Group, Tween } from '@tweenjs/tween.js';
import { Game } from 'app/game';
import { PlayEffect } from 'app/game/messages';
import { Task } from 'app/game/tasks';

export class EffectTask extends Task {
  private readonly animTargets = new Set();
  private readonly tween = new Group();
  private elapsed = 0;

  constructor(game: Game) {
    super(game);
    this.game.messages$.ofType(PlayEffect.Shake).subscribe(this.shake);
  }

  update(dt: number) {
    this.elapsed += dt;
    this.tween.update(this.elapsed);
  }

  private shake = ({ target }: PlayEffect.Shake) => {
    if (target) {
      if (this.animTargets.has(target))
        return;
      this.animTargets.add(target);
      target.renderTranslation = target.renderTranslation || [0, 0];
      const offsets = [8, -8, 6, -6, 4, -4, 2, -2, 0];
      new Tween(target.renderTranslation, this.tween)
        .to({ [0]: offsets.slice(0, 4) }, 500)
        .chain(new Tween(target.renderTranslation, this.tween).to({ [0]: offsets.slice(4) }, 500))
        .onComplete(() => this.animTargets.delete(target))
        .start(this.elapsed);
    }
  }
}