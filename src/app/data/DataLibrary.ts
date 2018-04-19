import { Terrain } from 'app/data/Terrain';
import { TileObject } from 'app/data/TileObject';

export interface DataLibrary {
  readonly terrains: Terrain[];
  readonly objects: TileObject[];
}

export namespace DataLibrary {
  export const Empty: DataLibrary = {
    terrains: [],
    objects: [],
  };
}