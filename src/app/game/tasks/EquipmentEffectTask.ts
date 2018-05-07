import { Game } from 'app/game';
import { Task } from 'app/game/tasks';
import { Inventory, Stats, StatList } from 'app/game/traits';
import { Effect } from 'common/data';
import { EffectDef } from 'data/effects';

export class EquipmentEffectTask extends Task {
  constructor(game: Game) {
    super(game);
  }

  update(dt: number) {
    const { slots } = this.game.player.traits.get(Inventory);
    const { boost, effects } = this.game.player.traits.get(Stats);

    const equipments = slots.slice(40, 43);

    for (const { item } of equipments) {
      if (!item || !item.effects) continue;
      for (const effect of item.effects) {
        this.applyEffect(effect, boost);
      }
    }
  }

  private applyEffect(effect: Effect, boost: StatList) {
    switch (effect.type) {
      case EffectDef.Type.Resistance:
        boost.def += effect.power; break;
      case EffectDef.Type.DefBreak:
        boost.def -= effect.power; break;

      case EffectDef.Type.Speed:
        boost.spd += effect.power; break;
      case EffectDef.Type.Slowness:
        boost.spd -= effect.power; break;

      case EffectDef.Type.Strength:
        boost.str += effect.power; break;
      case EffectDef.Type.Weakness:
        boost.str -= effect.power; break;

      case EffectDef.Type.VitalityUp:
        boost.vit += effect.power; break;
      case EffectDef.Type.VitalityDown:
        boost.vit -= effect.power; break;
    }
  }
}