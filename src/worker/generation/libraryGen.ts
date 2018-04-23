import { RandomSeed, create as createRand } from 'random-seed';
import { makeObjects } from 'data/objects';
import { makeTerrains } from 'data/terrains';
import { makeFlower, makeBerryBush, makeBush } from 'data/template';
import { loadDataLib } from 'common/data';
import { ProgressReporter } from 'worker/generation/ProgressReporter';
import { randomColors } from 'worker/generation/utils';

const NumFlowers = 16;
const NumBerries = 16;

export function generateLibrary(seed: string, report: ProgressReporter) {
  const random = createRand(seed);
  report('generating game data...', 0);

  const terrains = makeTerrains();
  const objects = makeObjects();

  const flowerColors = randomColors(random, NumFlowers);
  for (let i = 0; i < NumFlowers; i++) {
    objects[`flower-${i}`] = makeFlower(random.random(), flowerColors[i].toString(16));
  }

  const berryColors = randomColors(random, NumBerries, 1, 0.8);
  for (let i = 0; i < NumBerries; i++) {
    objects[`berrybush-${i}`] = makeBerryBush(berryColors[i].toString(16));
    objects[`berrybush-${i}-depleted`] = makeBush();
  }

  return loadDataLib(terrains, objects);
}