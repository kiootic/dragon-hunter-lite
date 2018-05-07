import { Aspect, Effect } from 'common/data';
import { computeEffects, makeEffect } from 'common/logic/effect/common';
import { EffectDef } from 'data/effects';
import { ElementDef } from 'data/elements';

function computeEffect(element: string, strength: number, strengths: Record<string, number>) {
  switch (element) {
    case ElementDef.Type.Life:
    case ElementDef.Type.Recovery: {
      let amount = strength * 100;
      if (element === ElementDef.Type.Life)
        amount *= 0.5;

      let duration = 0;
      if (strengths[ElementDef.Type.Time] >= 0.2) {
        duration = strengths[ElementDef.Type.Time] * 30000;
        amount = amount / duration * 1500;
        return makeEffect(EffectDef.Type.Regen, amount, duration);
      } else {
        return makeEffect(EffectDef.Type.Heal, amount, 0);
      }
    }
    case ElementDef.Type.Void:
    case ElementDef.Type.Injury: {
      let amount = strength * 50;
      if (element === ElementDef.Type.Void)
        amount *= 0.3;

      let duration = 0;
      if (strengths[ElementDef.Type.Time] >= 0.2) {
        duration = strengths[ElementDef.Type.Time] * 20000;
        amount = amount / duration * 1500;
        return makeEffect(EffectDef.Type.Poison, amount, duration);
      } else {
        return makeEffect(EffectDef.Type.Damage, amount, 0);
      }
    }
    case ElementDef.Type.Defense: {
      let amount = strength * 50;

      if (strengths[ElementDef.Type.Void] > 0.3)
        return makeEffect(EffectDef.Type.DefBreak, amount, 10000);
      else
        return makeEffect(EffectDef.Type.Resistance, amount, 10000);
    }
    case ElementDef.Type.Motion: {
      let amount = strength * 50;

      return makeEffect(EffectDef.Type.Speed, amount, 10000);
    }
    case ElementDef.Type.Frost:
    case ElementDef.Type.Capture: {
      let amount = strength * 50;
      if (element === ElementDef.Type.Capture)
        amount *= 1.5;

      return makeEffect(EffectDef.Type.Slowness, amount, 10000);
    }
    case ElementDef.Type.Energy: {
      let amount = strength * 25;

      return makeEffect(EffectDef.Type.Strength, amount, 10000);
    }
    case ElementDef.Type.Weakness: {
      let amount = strength * 25;

      return makeEffect(EffectDef.Type.Weakness, amount, 10000);
    }
  }
}

export function compute(aspects: Aspect[]): Effect[] {
  return computeEffects(aspects, computeEffect);
}