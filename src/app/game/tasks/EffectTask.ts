import { Game } from 'app/game';
import { Entity } from 'app/game/entities';
import { ApplyEffects, UpdateHP } from 'app/game/messages';
import { Task } from 'app/game/tasks';
import { Stats, StatList } from 'app/game/traits';
import { Effect } from 'common/data';
import { EffectDef } from 'data/effects';

export class EffectTask extends Task {
  constructor(game: Game) {
    super(game);
    this.game.messages$.ofType(ApplyEffects).subscribe(this.applyEffects);
  }

  private applyEffects = ({ entityId, effects }: ApplyEffects) => {
    const entity = this.game.entities.get(entityId);
    if (!entity) return;
    const stats = entity.traits.get(Stats);
    if (!stats) return;

    const entityEffects = stats.effects;

    // replace existing effect if duration of new effect is longer
    for (let i = 0; i < entityEffects.length; i++) {
      const { type, duration } = entityEffects[i];
      const effectIndex = effects.findIndex(effect => effect.type === type && effect.duration >= duration);
      if (effectIndex >= 0) {
        entityEffects[i] = effects.splice(effectIndex, 1)[0];
      }
    }

    entityEffects.push(...effects);
  }

  update(dt: number) {
    for (const entity of this.game.entities.withTrait(Stats)) {
      const { base, boost, effects } = entity.traits.get(Stats);
      // reset boost stats, recalc each tick
      boost.hp = 0;
      boost.maxHp = 0;
      boost.str = 0;
      boost.def = 0;
      boost.spd = 0;
      boost.vit = 0;

      for (let i = effects.length - 1; i >= 0; i--) {
        const effect = effects[i];
        // when a second just elapsed
        const secEdge = (Math.floor(effect.duration / 1000) - Math.floor((effect.duration - dt) / 1000)) !== 0;
        this.applyEffect(effect, entity, base, boost, secEdge);
        effect.duration -= dt;
        if (effect.duration <= 0)
          effects.splice(i, 1);
      }
    }
  }

  private applyEffect(effect: Effect, entity: Entity, base: StatList, boost: StatList, secondEdge: boolean) {
    switch (effect.type) {
      case EffectDef.Type.Regen: if (!secondEdge) break;
      case EffectDef.Type.Heal:
        this.game.dispatch(new UpdateHP(entity.id, effect.power));
        break;

      case EffectDef.Type.Poison: if (!secondEdge) break;
      case EffectDef.Type.Damage:
        this.game.dispatch(new UpdateHP(entity.id, -effect.power));
        break;

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