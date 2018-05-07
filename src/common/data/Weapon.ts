export interface Weapon {
  readonly type: Weapon.Type;
  readonly strength: number;
  readonly cooldown: number;
  readonly knockback: number;
  readonly range: number;
}

export namespace Weapon {
  export enum Type {
    Sword = 'sword',
    Spear = 'spear',
    Bow = 'bow',
    Arrow = 'arrow'
  }
}