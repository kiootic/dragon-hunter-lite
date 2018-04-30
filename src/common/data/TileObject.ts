import { DropTable, Item } from 'common/data';
import { TextureDef } from 'common/data/TextureDef';
import { RandomTemplate } from 'common/random';

export interface TileObjectDrops {
  readonly replaceWith: number;
  readonly hp: number;
  readonly table: DropTable;
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
