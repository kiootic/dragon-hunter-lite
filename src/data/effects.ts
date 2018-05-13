export interface EffectDef {
  readonly name: string;
  readonly description: string;
  readonly visible: boolean;
}

export namespace EffectDef {
  export enum Type {
    Stunned = 'stunned',
    Knockback = 'knockback',
    KnockbackResist = 'knockback-resist',

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

function effect(name: string, description: string, visible = true): EffectDef {
  return { name, description, visible };
}

export const Effects: Record<EffectDef.Type, EffectDef> = {
  // technical effects
  [EffectDef.Type.Stunned]: effect('Stunned', 'Cannot move or attack', false),
  [EffectDef.Type.Knockback]: effect('Knockback', 'Cannot move', false),
  [EffectDef.Type.KnockbackResist]: effect('Knockback Resistance', 'Resist knockback', false),

  // actual effects
  [EffectDef.Type.Heal]: effect('Heal', 'Recover <power> HP', false),
  [EffectDef.Type.Damage]: effect('Damage', 'Damage <power> HP', false),
  [EffectDef.Type.Regen]: effect('Regeneration', 'Recover <power> HP regularly'),
  [EffectDef.Type.Poison]: effect('Poison', 'Lose <power> HP regularly'),
  [EffectDef.Type.Strength]: effect('Strength', 'Increase strength by <power>'),
  [EffectDef.Type.Weakness]: effect('Weakness', 'Decrease strength by <power>'),
  [EffectDef.Type.Resistance]: effect('Resistance', 'Increase defense by <power>'),
  [EffectDef.Type.DefBreak]: effect('Defense Break', 'Decrease defense by <power>'),
  [EffectDef.Type.Speed]: effect('Speed', 'Increase speed by <power>'),
  [EffectDef.Type.Slowness]: effect('Slowness', 'Decrease speed by <power>'),
  [EffectDef.Type.VitalityUp]: effect('Vitality Up', 'Increase vitality by <power>'),
  [EffectDef.Type.VitalityDown]: effect('Vitality Down', 'Decrease vitality by <power>'),
};