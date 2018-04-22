import { Terrain } from 'common/data/Terrain';
import { TileObject } from 'common/data/TileObject';

export interface DataLibrary {
  readonly terrains: Terrain[];
  readonly objects: TileObject[];
}
