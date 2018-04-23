import { vec2 } from 'gl-matrix';

export interface Biome {
  index: number;
  type: Biome.Type;
  feature: Biome.Feature;

  temperature: number;
  humidity: number;

  position: vec2;
  min: vec2;
  max: vec2;
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
  export enum Feature {
    None,
    Pond,
    LavaPond,
    Floral,
    Rocky,
    Oasis,
    Cemetery,
    Ruins,
  }
}