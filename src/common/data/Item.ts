import { TextureDef } from 'common/data/TextureDef';

export interface Item {
  readonly name: string;
  readonly type: Item.Type;
  readonly texture: TextureDef;
}

export interface ItemSlot {
  item: Item | null;
  accepts: Item.Type[] | null;
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