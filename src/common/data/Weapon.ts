export interface Weapon {
  readonly type: Weapon.Type;
  readonly pierce?: boolean;
  readonly strength: number;
  readonly cooldown: number;
  readonly knockback: number;
  readonly range: number;
  readonly color: string;
}

export namespace Weapon {
  export enum Type {
    Sword = 'sword',
    Spear = 'spear',
    Bow = 'bow',
    Arrow = 'arrow',
    Fist = 'fist',

    Bolt = 'bolt',
    Orb = 'orb',
    Invisible = 'invisible'
  }
}