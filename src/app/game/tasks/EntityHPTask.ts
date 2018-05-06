import { Game } from 'app/game';
import { ShowParticles, UpdateHP } from 'app/game/messages';
import { Task } from 'app/game/tasks';
import { Spatial, Stats } from 'app/game/traits';
import { clamp } from 'lodash';

export class EntityHPTask extends Task {
  constructor(game: Game) {
    super(game);
    this.game.messages$.ofType(UpdateHP).subscribe(this.updateHP);
  }

  private updateHP = ({ entityId, hpDiff }: UpdateHP) => {
    const entity = this.game.entities.get(entityId);
    if (!entity) return;
    const stats = entity.traits.get(Stats);
    if (!stats) return;

    stats.base.hp = clamp(stats.base.hp + hpDiff, 0, stats.base.maxHp + stats.boost.maxHp);

    const position = entity.traits.get(Spatial).position;
    if (hpDiff > 0)
      this.game.dispatch(ShowParticles.float(position, 20, 0xffffff));
    else if (hpDiff < 0)
      this.game.dispatch(ShowParticles.splash(position, 20, 0xff0000));
  }

  update(dt: number) {
  }
}