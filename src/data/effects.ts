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

export const Effects: Record<EffectDef.Type, EffectDef> = {
  [EffectDef.Type.Heal]: {
    name: 'Heal',
    description: 'Recover <power> HP'
  },
  [EffectDef.Type.Damage]: {
    name: 'Damage',
    description: 'Damage <power> HP'
  },
  [EffectDef.Type.Regen]: {
    name: 'Regeneration',
    description: 'Increase vitality by <power>'
  },
  [EffectDef.Type.Poison]: {
    name: 'Poison',
    description: 'Lose <power> HP regularly'
  },
  [EffectDef.Type.Speed]: {
    name: 'Speed',
    description: 'Increase speed by <power>'
  },
  [EffectDef.Type.Slowness]: {
    name: 'Slowness',
    description: 'Decrease speed by <power>'
  },
  [EffectDef.Type.Strength]: {
    name: 'Strength',
    description: 'Increase strength by <power>'
  },
  [EffectDef.Type.Weakness]: {
    name: 'Weakness',
    description: 'Decrease strength by <power>'
  },
};