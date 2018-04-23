import { generateBiomes } from 'worker/generation/biomeGen';
import { create as createRand } from 'random-seed';
import { MapData } from 'worker/generation/data';
import { DataLibrary, loadDataLib, GameSave } from 'common/data';
import { ProgressReporter } from 'worker/generation/ProgressReporter';
import { generateFeatures } from 'worker/generation/featureGen';
import { decorateMap } from 'worker/generation/decoration';
import { generateLibrary } from 'worker/generation/libraryGen';

declare function require(path: string): any;

export function generate(
  width: number, height: number, seed: string,
  report: ProgressReporter = () => { }
) {
  const library = generateLibrary(seed, report);

  const map = new MapData(width, height, seed, library);
  generateBiomes(map, report);
  generateFeatures(map, report);
  decorateMap(map, report);
  report('done!', 1);
  const mapData = map.finalize();

  return new GameSave(library, mapData);
}
