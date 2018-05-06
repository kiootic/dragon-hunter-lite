export interface EffectDef {
  readonly name: string;
  readonly description: string;
}

export namespace EffectDef {
  export enum Type {
    Heal = 'heal',
    Damage = 'damage',
    Regen = 'regen',
    Poison = 'poison',
    Speed = 'speed',
    Slowness = 'slowness',
    Strength = 'strength',
    Weakness = 'weakness',
  }
}

export const EffectAdverbs = [
  ' slightly',
  '',
  ' greatly',
  ' drastically',
];

export const Effects: Record<EffectDef.Type, EffectDef> = {
  [EffectDef.Type.Heal]: {
    name: 'Heal',
    description: 'Recover HP${adv}'
  },
  [EffectDef.Type.Damage]: {
    name: 'Damage',
    description: 'Damage HP${adv}'
  },
  [EffectDef.Type.Regen]: {
    name: 'Regeneration',
    description: 'Increase vitality${adv}'
  },
  [EffectDef.Type.Poison]: {
    name: 'Poison',
    description: 'Lose HP${adv} regularly'
  },
  [EffectDef.Type.Speed]: {
    name: 'Speed',
    description: 'Increase speed${adv}'
  },
  [EffectDef.Type.Slowness]: {
    name: 'Slowness',
    description: 'Decrease speed${adv}'
  },
  [EffectDef.Type.Strength]: {
    name: 'Strength',
    description: 'Increase strength${adv}'
  },
  [EffectDef.Type.Weakness]: {
    name: 'Weakness',
    description: 'Decrease strength${adv}'
  },
};