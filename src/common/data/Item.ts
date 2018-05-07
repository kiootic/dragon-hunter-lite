import { Aspect, Effect, Material, TextureDef, Weapon } from 'common/data';

export interface Item {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly type: Item.Type;
  readonly texture: TextureDef;
  readonly aspects?: Aspect[];
  readonly effects?: Effect[];
  readonly material?: Material;
  readonly weapon?: Weapon;
}

export interface ItemSlot {
  item: Item | null;
  accepts: Item.Type[] | string | null;
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