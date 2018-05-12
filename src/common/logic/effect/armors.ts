import { Aspect, Effect, Element, Item, MaterialStats } from 'common/data';
import { mix } from 'common/logic/alchemy';
import { computeEffects, makeEffect, scaleAspects } from 'common/logic/effect/common';
import { EffectDef } from 'data/effects';
import { ElementDef } from 'data/elements';

function computeEffect(element: string, strength: number, strengths: Record<string, number>) {
  switch (element) {
    case ElementDef.Type.Energy: {
      let amount = strength * 50;

      return makeEffect(EffectDef.Type.Strength, amount, 0);
    }
    case ElementDef.Type.Weakness: {
      let amount = strength * 50;

      return makeEffect(EffectDef.Type.Weakness, amount, 0);
    }
    case ElementDef.Type.Defense: {
      let amount = strength * 50;

      if (strengths[ElementDef.Type.Void] > strength * 0.5)
        return makeEffect(EffectDef.Type.DefBreak, amount, 0);
      else
        return makeEffect(EffectDef.Type.Resistance, amount, 0);
    }
    case ElementDef.Type.Life:
    case ElementDef.Type.Recovery: {
      let amount = strength * 50;
      if (element === ElementDef.Type.Life)
        amount *= 0.5;

      return makeEffect(EffectDef.Type.VitalityUp, amount, 0);
    }
    case ElementDef.Type.Void:
    case ElementDef.Type.Injury: {
      let amount = strength * 50;
      if (element === ElementDef.Type.Void)
        amount *= 0.3;

      return makeEffect(EffectDef.Type.VitalityDown, amount, 0);
    }
    case ElementDef.Type.Motion: {
      let amount = strength * 50;

      return makeEffect(EffectDef.Type.Speed, amount, 0);
    }
    case ElementDef.Type.Frost:
    case ElementDef.Type.Capture: {
      let amount = strength * 50;
      if (element === ElementDef.Type.Capture)
        amount *= 1.5;

      return makeEffect(EffectDef.Type.Slowness, amount, 0);
    }
  }
}

export function compute(
  parts: Item[], material: MaterialStats,
  multiplier: number, data: Record<string, Element>
): [Effect[], Aspect[]] {
  const materialAspects: Aspect[] = [{
    element: ElementDef.Type.Defense,
    amount: material.toughness * (1 + Math.pow(material.weight, 0.75)) * 1000 * multiplier
  }, {
    element: ElementDef.Type.Capture,
    amount: material.weight * 10 * multiplier
  }, {
    element: ElementDef.Type.Energy,
    amount: material.sharpness * 100 * multiplier
  }];

  const affinity = Math.pow(material.affinity, 0.5);
  const aspects = mix([
    ...parts.map(item => ({ aspects: scaleAspects(item.aspects || [], affinity) })),
    { aspects: materialAspects }
  ], data);
  return [computeEffects(aspects, computeEffect, 0.01), aspects];
}