import { TextureDef } from 'common/data/TextureDef';

export interface Item {
  readonly name: string;
  readonly texture: TextureDef;
}

export namespace Item {
  export enum Type {
    Material = 'material',
    Consumable = 'consumable',
    Weapon = 'weapon',
    Chestplate = 'chestplate',
    Leggings = 'leggings',
    Boots = 'boots',
  }
}