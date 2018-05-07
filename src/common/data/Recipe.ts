import { Item, TextureDef } from 'common/data';

export interface Recipe {
  output: Item;
  input: {
    accepts: string,
    texture: TextureDef
  }[];
}