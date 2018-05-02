import { Recipe, Terrain, TileObject } from 'common/data';

export interface DataLibrary {
  readonly terrains: Terrain[];
  readonly objects: TileObject[];
  readonly recipes: Recipe[];
}

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

function populateNameId<T extends { id: number, name: string }>(items: Record<string, Omit<T, 'id' | 'name'>>): T[] {
  const result: T[] = [];
  const keys = Object.keys(items).sort();
  let id = 1;

  for (const name of keys) {
    const itemId = id++;
    result[itemId] = Object.assign({}, items[name], { id: itemId, name }) as T;
  }
  return result;
}

export function loadDataLib(
  terrains: Record<string, Omit<Terrain, 'id' | 'name'>>,
  objects: Record<string, Omit<TileObject, 'id' | 'name'>>,
  recipes: Recipe[]
): DataLibrary {
  return {
    terrains: populateNameId(terrains),
    objects: populateNameId(objects),
    recipes
  };
}