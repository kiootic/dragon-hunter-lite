import { TextureDef } from './TextureDef';

export interface TileObject {
  id: number;
  name: string;
  texture: TextureDef;
  color: string;
  scale?: number;
  terrain?: boolean;
  obstacle?: boolean;
}
