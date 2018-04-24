import { GameSave } from 'common/data';
import { generateBiomes } from 'worker/generation/biomeGen';
import { MapData } from 'worker/generation/data';
import { decorateMap } from 'worker/generation/decoration';
import { generateFeatures } from 'worker/generation/featureGen';
import { generateLibrary } from 'worker/generation/libraryGen';
import { generatePlayer } from 'worker/generation/playerGen';
import { ProgressReporter } from 'worker/generation/ProgressReporter';

export function generate(
  width: number, height: number, seed: string,
  report: ProgressReporter = () => { }
) {
  const library = generateLibrary(seed, report);

  const map = new MapData(width, height, seed, library);
  generateBiomes(map, report);
  generateFeatures(map, report);
  decorateMap(map, report);
  generatePlayer(map, report);
  report('done!', 1);
  const mapData = map.finalize();

  return new GameSave(library, mapData, map.player);
}
