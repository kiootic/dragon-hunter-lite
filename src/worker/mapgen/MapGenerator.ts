import { TileMap } from 'worker/map/TileMap';
import { generateBiomes, rasterize } from 'worker/mapgen/biome';
import { create as createRand } from "random-seed";

export interface ProgressReporter {
  (message: string | null, progress: number): void;
}

declare function require(path: string): any;

export class MapGenerator {
  public readonly map: TileMap;

  constructor(width: number, height: number, public readonly seed = '') {
    this.map = new TileMap(width, height);
  }

  public generate(reporter: ProgressReporter = () => { }) {
    const rand = createRand(this.seed);
    reporter('generating biomes...', 0);
    const biomes = generateBiomes(rand, this.map.width, this.map.height);
    reporter('rasterizing...', 0);
    rasterize(biomes, this.map, rand, reporter);

    return {
      map: this.map, library: {
        terrains: require('../../data/terrains.json'),
        objects: require('../../data/objects.json')
      }
    };
  }
}