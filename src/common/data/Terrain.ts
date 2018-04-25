import { TextureDef } from 'common/data/TextureDef';

export interface Terrain {
  id: number;
  name: string;
  texture: TextureDef;
  color: string;
  liquid?: boolean;
}
