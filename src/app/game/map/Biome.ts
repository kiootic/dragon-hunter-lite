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
    FrozenBarren,
    Barren,
    Desert,
    SnowPlain,
    Savanna,
    Plain,
    Taiga,
    Forest,
    FrozenLake,
    Lake,
    Swamp,
  }
}