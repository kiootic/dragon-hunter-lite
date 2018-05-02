import { Item, TextureDef } from 'common/data';

export interface Recipe {
  output: Item;
  input: {
    id: string,
    texture: TextureDef
  }[];
}