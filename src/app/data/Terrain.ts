import { TextureDef } from './TextureDef';

export interface Terrain {
  id: number;
  name: string;
  texture: TextureDef;
  color: string;
}
