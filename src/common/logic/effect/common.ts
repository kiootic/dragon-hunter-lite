import { Aspect, Effect } from 'common/data';
import { MaxAspects } from 'common/logic/alchemy';
import { Effects, EffectDef } from 'data/effects';
import { fromPairs, round } from 'lodash';

export function scaleAspects(aspects: Aspect[], scale: number) {
  return aspects.map(({ element, amount }) => ({ element, amount: amount * scale }));
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

const StrengthThreshold = 0.1;

function computeStrength(amount: number, total: number) {
  const purity = amount / total;
  const power = Math.pow(amount / MaxAspects, 0.75);
  const strength = purity * power;
  return strength;
}

type EffectComputer = (element: string, strength: number, strengths: Record<string, number>) => Effect | undefined;
export function computeEffects(aspects: Aspect[], compute: EffectComputer, threshold = StrengthThreshold): Effect[] {
  let total = 0;
  for (const { amount } of aspects) total += amount;

  const strengths = fromPairs(aspects.map<[string, number]>(({ element, amount }) =>
    [element, computeStrength(amount, total)]
  ).sort((a, b) => b[1] - a[1]));

  const effects: Effect[] = [];
  for (const element of Object.keys(strengths)) {
    const strength = strengths[element];
    if (strength < threshold) continue;

    const effect = compute(element, strength, strengths);
    if (effect)
      effects.push(effect);
  }

  return effects;
}