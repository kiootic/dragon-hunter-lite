import { Terrain } from './Terrain';
import { TileObject } from './TileObject';

export interface DataLibrary {
  readonly terrains: Terrain[];
  readonly objects: TileObject[];
}
