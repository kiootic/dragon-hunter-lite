import { Terrain } from 'app/data/Terrain';

export interface DataLibrary {
  readonly terrains: Terrain[];
}

export namespace DataLibrary {
  export const Empty: DataLibrary = {
    terrains: []
  };
}