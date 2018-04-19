import { generateBiomes } from 'worker/mapgen/biomeGen';
import { create as createRand } from 'random-seed';
import { MapData } from 'worker/mapgen/data';
import { DataLibrary } from 'worker/data';
import { ProgressReporter } from 'worker/mapgen/ProgressReporter';

declare function require(path: string): any;

export function generate(
  width: number, height: number, seed: string, library: DataLibrary,
  report: ProgressReporter = () => { }
) {
  const map = new MapData(width, height, seed, library);
  const biomes = generateBiomes(map, report);

  return map.finalize();
}
