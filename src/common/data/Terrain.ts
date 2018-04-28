import { TextureDef } from 'common/data/TextureDef';

export interface Terrain {
  readonly id: number;
  readonly name: string;
  readonly texture: TextureDef;
  readonly color: string;
  readonly liquid?: boolean;
}
