import { TextureDef } from 'common/data/TextureDef';

export interface TileObject {
  readonly id: number;
  readonly name: string;
  readonly texture: TextureDef;
  readonly color: string;
  readonly scale?: number;
  readonly jitter?: boolean;
  readonly terrain?: boolean;
  readonly obstacle?: boolean;
}
