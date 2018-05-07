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

    Strength = 'strength',
    Weakness = 'weakness',
    Resistance = 'resistance',
    DefBreak = 'def-break',
    Speed = 'speed',
    Slowness = 'slowness',
    VitalityUp = 'vit-up',
    VitalityDown = 'vit-down',
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
    description: 'Recover <power> HP regularly'
  },
  [EffectDef.Type.Poison]: {
    name: 'Poison',
    description: 'Lose <power> HP regularly'
  },
  [EffectDef.Type.Strength]: {
    name: 'Strength',
    description: 'Increase strength by <power>'
  },
  [EffectDef.Type.Weakness]: {
    name: 'Weakness',
    description: 'Decrease strength by <power>'
  },
  [EffectDef.Type.Resistance]: {
    name: 'Resistance',
    description: 'Increase defense by <power>'
  },
  [EffectDef.Type.DefBreak]: {
    name: 'Defense Break',
    description: 'Decrease defense by <power>'
  },
  [EffectDef.Type.Speed]: {
    name: 'Speed',
    description: 'Increase speed by <power>'
  },
  [EffectDef.Type.Slowness]: {
    name: 'Slowness',
    description: 'Decrease speed by <power>'
  },
  [EffectDef.Type.VitalityUp]: {
    name: 'Vitality Up',
    description: 'Increase vitality by <power>'
  },
  [EffectDef.Type.VitalityDown]: {
    name: 'Vitality Down',
    description: 'Decrease vitality by <power>'
  },
};