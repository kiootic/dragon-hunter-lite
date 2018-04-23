import { RandomSeed, create as createRand } from 'random-seed';
import { objects } from 'data/objects';
import { terrains } from 'data/terrains';
import { loadDataLib } from 'common/data';
import { ProgressReporter } from 'worker/generation/ProgressReporter';

export function generateLibrary(seed: string, report: ProgressReporter) {
  const random = createRand(seed);
  report('generating game data...', 0);
  return loadDataLib(terrains, objects);
}