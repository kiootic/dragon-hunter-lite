import { Aspect, Element, Item } from 'common/data';
import { compute } from 'common/logic/effect';
import { randomValue } from 'common/random';
import { Elements, ElementLookup } from 'data/elements';

export const MaxAspects = 1000;

export function makeSolution(aspects: Aspect[], data: Record<string, Element>): Item {
  let total = 0;

  const rgb = [0, 0, 0];
  // color
  for (const { element, amount } of aspects) {
    const elemColor = parseInt(data[element].color, 16);
    rgb[0] += ((elemColor >> 16) & 0xff) * amount;
    rgb[1] += ((elemColor >> 8) & 0xff) * amount;
    rgb[2] += ((elemColor >> 0) & 0xff) * amount;
    total += amount;
  }
  const color = (
    (Math.floor(rgb[0] / total) << 16) +
    (Math.floor(rgb[1] / total) << 8) +
    (Math.floor(rgb[2] / total) << 0)
  ).toString(16);

  // name
  let max = 0, maxElem = '';
  for (const { element, amount } of aspects) {
    if (amount > max) {
      max = amount;
      maxElem = element;
    }
  }
  let name: string;
  if (max < 100) name = `Mundane Solution`;
  else if (max / total < 0.5) name = 'Mixed solution';
  else if (max < 300) name = `Solution of ${maxElem}`;
  else if (max < 500) name = `Solution of Greater ${maxElem}`;
  else if (max < 700) name = `Solution of Mythical ${maxElem}`;
  else name = `Solution of Perfect ${maxElem}`;

  return {
    id: 'solution',
    name,
    type: Item.Type.Consumable,
    texture: {
      type: 'composite',
      base: 'sprites/items/solution',
      overlay: {
        type: 'single',
        tex: 'sprites/items/solution-overlay',
        tint: color
      }
    },
    aspects,
    effects: compute(aspects)
  };
}

const PurifyThreshold = 0.25;
const PurifyRate = 0.4;
const BoostRate = 1.5;
const FissionLoss = 0.25;
const FusionLoss = 0.1;
const Epsilon = 1;

export function mix(a: Item, b: Item, data: Record<string, Element>): Item {
  const aspects: Record<string, number> = {};
  for (const { element, amount } of [...a.aspects || [], ...b.aspects || []])
    aspects[element] = (aspects[element] || 0) + amount;

  const fusionBoost = (a.id === 'gel-bone' || b.id === 'gel-bone') ? BoostRate : 1;
  const fissionBoost = (a.id === 'gel-stone' || b.id === 'gel-stone') ? BoostRate : 1;

  // fusion
  for (const { name: element, composition: compo } of Elements) {
    if (!compo) continue;

    const threshold = randomValue(data[element].fusionThreshold) / fusionBoost / fissionBoost;
    const inputAmount = Math.min(aspects[compo[0]] || 0, aspects[compo[1]] || 0);
    if (inputAmount <= threshold) continue;
    console.log(`fusion ${element}: ${inputAmount} <= ${threshold}`);

    const amount = (inputAmount - threshold) * randomValue(data[element].fusionRate);
    const compoRatio = Math.random() * 0.5 + 0.25;

    aspects[element] = (aspects[element] || 0) + amount * (1 - FusionLoss);
    aspects[compo[0]] -= amount * compoRatio;
    aspects[compo[1]] -= amount * (1 - compoRatio);
  }

  // fission
  for (const element of Object.keys(aspects)) {
    const threshold = randomValue(data[element].fissionThreshold) * fissionBoost / fusionBoost;
    if (aspects[element] >= threshold) continue;
    console.log(`fission ${element}: ${aspects[element]} >= ${threshold}`);

    const amount = aspects[element] * randomValue(data[element].fissionRate);
    const compo = ElementLookup[element].composition;
    const compoRatio = Math.random() * 0.5 + 0.25;

    if (compo) {
      aspects[compo[0]] = (aspects[compo[0]] || 0) + amount * (1 - FissionLoss) * compoRatio;
      aspects[compo[1]] = (aspects[compo[1]] || 0) + amount * (1 - FissionLoss) * (1 - compoRatio);
    }
    aspects[element] -= amount;
  }

  // purify
  let total = 0;
  if (a.id === 'gel-alchemy' || b.id === 'gel-alchemy') {
    for (const element of Object.keys(aspects)) total += aspects[element];
    for (const element of Object.keys(aspects)) {
      const amount = aspects[element];
      if (amount / total < PurifyThreshold) {
        aspects[element] *= 1 - PurifyRate;
      }
    }
  }

  // decay & clamp to range
  total = 0;
  for (const element of Object.keys(aspects)) total += aspects[element];
  for (const element of Object.keys(aspects)) {
    let amount = aspects[element];
    if (amount < Epsilon) amount = 0;
    else if (amount > MaxAspects) amount = MaxAspects;
    aspects[element] = amount;
  }

  const finalAspects = Object.keys(aspects)
    .map(element => ({ element, amount: aspects[element] }))
    .filter(({ amount }) => amount > 0);
  console.log(finalAspects);

  return makeSolution(finalAspects, data);
}