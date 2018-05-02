import { DropTable, Item, TextureDef } from 'common/data';
import { RandomTemplate } from 'common/random';

export interface TileObjectDrops {
  readonly replaceWith: string | null;
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
