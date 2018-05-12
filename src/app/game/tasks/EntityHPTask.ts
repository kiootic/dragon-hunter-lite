import { Game } from 'app/game';
import { Death, ShowParticles, UpdateHP } from 'app/game/messages';
import { Task } from 'app/game/tasks';
import { Spatial, Stats } from 'app/game/traits';
import { healPerTick } from 'common/logic/stats';
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

    const { maxHp } = Stats.compute(stats);
    stats.base.hp = clamp(stats.base.hp + hpDiff, 0, maxHp);

    const position = entity.traits.get(Spatial).position;
    if (stats.base.hp === 0)
      this.game.dispatch(ShowParticles.splash(position, 100, 0xff0000));
    else if (hpDiff > 0)
      this.game.dispatch(ShowParticles.float(position, 20, 0xffffff));
    else if (hpDiff < 0)
      this.game.dispatch(ShowParticles.splash(position, 20, 0xff0000));

    if (stats.base.hp === 0)
      this.game.dispatch(new Death(entity.id));
  }

  update(dt: number) {
    for (const entity of this.game.entities.withTrait(Stats)) {
      const stats = entity.traits.get(Stats);
      const { vit, maxHp } = Stats.compute(stats);
      if (stats.base.hp > 0)
        stats.base.hp = clamp(stats.base.hp + healPerTick(vit), 0, maxHp);
    }
  }
}