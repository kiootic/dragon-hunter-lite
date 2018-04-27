import { GameSave } from 'common/data';
import { generateBiomes } from 'worker/generation/biomeGen';
import { GameData } from 'worker/generation/data';
import { decorateMap } from 'worker/generation/decoration';
import { generateFeatures } from 'worker/generation/featureGen';
import { generateLibrary } from 'worker/generation/libraryGen';
import { generateProps } from 'worker/generation/propsGen';
import { ProgressReporter } from 'worker/generation/ProgressReporter';

export function generate(
  width: number, height: number, seed: string,
  report: ProgressReporter = () => { }
) {
  const library = generateLibrary(seed, report);

  const data = new GameData(width, height, seed, library);
  generateBiomes(data, report);
  generateFeatures(data, report);
  decorateMap(data, report);
  generateProps(data, report);
  report('done!', 1);
  const mapData = data.finalizeMap();

  return new GameSave('', library, mapData, data.entities, data.game);
}
