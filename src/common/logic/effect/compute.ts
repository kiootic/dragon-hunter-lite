import { Aspect, Effect } from 'common/data';
import { MaxAspects } from 'common/logic/alchemy';
import { Effects, EffectDef } from 'data/effects';
import { ElementDef } from 'data/elements';
import { fromPairs, round } from 'lodash';

const StrengthThreshold = 0.1;

function computeStrength(amount: number, total: number) {
  const purity = amount / total;
  const power = Math.pow(amount / MaxAspects, 0.75);
  const strength = purity * power;
  return strength;
}

export function makeEffect(effect: EffectDef.Type, power: number, duration: number, element?: string): Effect {
  power = Math.round(power);
  duration = round(duration, -2);
  const name = Effects[effect].name;
  const description = Effects[effect].description.replace('<power>', power.toString()) +
    (duration ? ` for ${round(duration / 1000)} seconds` : '');

  return {
    type: effect,
    name, description,
    power, element, duration
  };
}

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
  let total = 0;
  for (const { amount } of aspects) total += amount;

  const strengths = fromPairs(aspects.map<[string, number]>(({ element, amount }) =>
    [element, computeStrength(amount, total)]
  ).sort((a, b) => b[1] - a[1]));

  const effects: Effect[] = [];
  for (const element of Object.keys(strengths)) {
    const strength = strengths[element];
    if (strength < StrengthThreshold) continue;

    const effect = computeEffect(element, strength, strengths);
    if (effect)
      effects.push(effect);
  }

  return effects;
}