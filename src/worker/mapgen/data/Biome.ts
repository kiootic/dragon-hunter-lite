import { vec2 } from "gl-matrix";

export interface Biome {
  type: Biome.Type;
  temperature: number;
  humidity: number;
  position: vec2;
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