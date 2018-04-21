import { generateBiomes } from 'worker/mapgen/biomeGen';
import { create as createRand } from 'random-seed';
import { MapData } from 'worker/mapgen/data';
import { DataLibrary } from 'worker/data';
import { ProgressReporter } from 'worker/mapgen/ProgressReporter';
import { generateFeatures } from 'worker/mapgen/featureGen';
import { decorateMap } from 'worker/mapgen/decoration';

declare function require(path: string): any;

export function generate(
  width: number, height: number, seed: string, library: DataLibrary,
  report: ProgressReporter = () => { }
) {
  const map = new MapData(width, height, seed, library);
  generateBiomes(map, report);
  generateFeatures(map, report);
  decorateMap(map, report);
  report('done!', 1);

  return map.finalize();
}
