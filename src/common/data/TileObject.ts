import { TextureDef } from 'common/data/TextureDef';

export interface TileObject {
  id: number;
  name: string;
  texture: TextureDef;
  color: string;
  scale?: number;
  jitter?: boolean;
  terrain?: boolean;
  obstacle?: boolean;
}
