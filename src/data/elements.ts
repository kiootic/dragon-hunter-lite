export interface ElementDef {
  readonly tier: number;
  readonly name: string;
  readonly composition?: [string, string];
}

export namespace ElementDef {
  export const MaxTier = 3;
  export enum Type {
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
}

function element(
  tier: number, name: ElementDef.Type,
  composition?: [ElementDef.Type, ElementDef.Type]
): ElementDef {
  return {
    tier,
    name,
    composition
  };
}

export const Elements: ElementDef[] = [
  element(0, ElementDef.Type.Fire),
  element(0, ElementDef.Type.Water),
  element(0, ElementDef.Type.Order),
  element(0, ElementDef.Type.Chaos),

  element(1, ElementDef.Type.Void, [ElementDef.Type.Fire, ElementDef.Type.Water]),
  element(1, ElementDef.Type.Light, [ElementDef.Type.Fire, ElementDef.Type.Order]),
  element(1, ElementDef.Type.Energy, [ElementDef.Type.Fire, ElementDef.Type.Chaos]),
  element(1, ElementDef.Type.Frost, [ElementDef.Type.Water, ElementDef.Type.Order]),
  element(1, ElementDef.Type.Motion, [ElementDef.Type.Water, ElementDef.Type.Chaos]),
  element(1, ElementDef.Type.Life, [ElementDef.Type.Order, ElementDef.Type.Chaos]),

  element(2, ElementDef.Type.Defense, [ElementDef.Type.Order, ElementDef.Type.Void]),
  element(2, ElementDef.Type.Heal, [ElementDef.Type.Order, ElementDef.Type.Life]),
  element(2, ElementDef.Type.Time, [ElementDef.Type.Order, ElementDef.Type.Motion]),
  element(2, ElementDef.Type.Explosion, [ElementDef.Type.Chaos, ElementDef.Type.Energy]),
  element(2, ElementDef.Type.Poison, [ElementDef.Type.Chaos, ElementDef.Type.Life]),
  element(2, ElementDef.Type.Darkness, [ElementDef.Type.Void, ElementDef.Type.Light]),
  element(2, ElementDef.Type.Weakness, [ElementDef.Type.Void, ElementDef.Type.Energy]),
  element(2, ElementDef.Type.Spirit, [ElementDef.Type.Energy, ElementDef.Type.Life]),
  element(2, ElementDef.Type.Capture, [ElementDef.Type.Frost, ElementDef.Type.Motion]),

  element(3, ElementDef.Type.Sense, [ElementDef.Type.Motion, ElementDef.Type.Spirit]),
  element(3, ElementDef.Type.Absorb, [ElementDef.Type.Heal, ElementDef.Type.Spirit]),
  element(3, ElementDef.Type.Cognition, [ElementDef.Type.Time, ElementDef.Type.Spirit]),
  element(3, ElementDef.Type.Decept, [ElementDef.Type.Weakness, ElementDef.Type.Spirit]),
];