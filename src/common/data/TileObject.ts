import { TextureDef } from 'common/data/TextureDef';

export interface TileObjectDrops {
  readonly replaceWith: number;
  readonly hp: number;
  readonly table: { id: number, prob: number }[];
}

export interface TileObject {
  readonly id: number;
  readonly name: string;
  readonly texture: TextureDef;
  readonly color: string;
  readonly scale?: number;
  readonly jitter?: boolean;
  readonly terrain?: boolean;
  readonly obstacle?: boolean;
  readonly interactive?: boolean;
  readonly drops?: TileObjectDrops;
}
