export interface Biome {
  type: Biome.Type;
  temperature: number;
  humidity: number;
  x: number;
  y: number;
}

export namespace Biome {
  export enum Type {
    None,
    Desert,
    Barren,
    Swamp,
    Forest,
    Plain,
    SnowPlain,
    SnowForest,
    Lake,
    FrozenLake,
  }
}