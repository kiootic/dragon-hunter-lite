import { Element } from 'common/data';

export enum ElementTypes {
  Fire = 'Fire',
  Water = 'Water',
  Order = 'Order',
  Chaos = 'Chaos',

  Void = 'Void',
  Light = 'Light',
  Energy = 'Energy',
  Frost = 'Frost',
  Motion = 'Motion',
  Life = 'Life',

  Defense = 'Defense',
  Heal = 'Heal',
  Time = 'Time',
  Explosion = 'Explosion',
  Poison = 'Poison',
  Darkness = 'Darkness',
  Weakness = 'Weakness',
  Spirit = 'Spirit',
  Capture = 'Capture',

  Sense = 'Sense',
  Absorb = 'Absorb',
  Cognition = 'Cognition',
  Decept = 'Decept',
}

function element(tier: number, name: ElementTypes, composition?: [ElementTypes, ElementTypes]): Element {
  return {
    tier,
    name,
    composition
  };
}

export const Elements: Element[] = [
  element(0, ElementTypes.Fire),
  element(0, ElementTypes.Water),
  element(0, ElementTypes.Order),
  element(0, ElementTypes.Chaos),

  element(1, ElementTypes.Void, [ElementTypes.Fire, ElementTypes.Water]),
  element(1, ElementTypes.Light, [ElementTypes.Fire, ElementTypes.Order]),
  element(1, ElementTypes.Energy, [ElementTypes.Fire, ElementTypes.Chaos]),
  element(1, ElementTypes.Frost, [ElementTypes.Water, ElementTypes.Order]),
  element(1, ElementTypes.Motion, [ElementTypes.Water, ElementTypes.Chaos]),
  element(1, ElementTypes.Life, [ElementTypes.Order, ElementTypes.Chaos]),

  element(2, ElementTypes.Defense, [ElementTypes.Order, ElementTypes.Void]),
  element(2, ElementTypes.Heal, [ElementTypes.Order, ElementTypes.Life]),
  element(2, ElementTypes.Time, [ElementTypes.Order, ElementTypes.Motion]),
  element(2, ElementTypes.Explosion, [ElementTypes.Chaos, ElementTypes.Energy]),
  element(2, ElementTypes.Poison, [ElementTypes.Chaos, ElementTypes.Life]),
  element(2, ElementTypes.Darkness, [ElementTypes.Void, ElementTypes.Light]),
  element(2, ElementTypes.Weakness, [ElementTypes.Void, ElementTypes.Energy]),
  element(2, ElementTypes.Spirit, [ElementTypes.Energy, ElementTypes.Life]),
  element(2, ElementTypes.Capture, [ElementTypes.Frost, ElementTypes.Motion]),

  element(3, ElementTypes.Sense, [ElementTypes.Motion, ElementTypes.Spirit]),
  element(3, ElementTypes.Absorb, [ElementTypes.Heal, ElementTypes.Spirit]),
  element(3, ElementTypes.Cognition, [ElementTypes.Time, ElementTypes.Spirit]),
  element(3, ElementTypes.Decept, [ElementTypes.Weakness, ElementTypes.Spirit]),
];