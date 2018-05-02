import { loadDataLib } from 'common/data';
import { generateName } from 'common/markov';
import { makeObjects } from 'data/objects';
import { makeRecipes } from 'data/recipes';
import { makeBerryBush, makeBush, makeFlower, NumBerryTypes, NumFlowerTypes } from 'data/template';
import { makeTerrains } from 'data/terrains';
import { create as createRand } from 'random-seed';
import { randomColors } from 'worker/generation/utils';
import { ProgressReporter } from 'worker/generation/ProgressReporter';

const NumFlowers = 16 / NumFlowerTypes;
const NumBerries = 16 / NumBerryTypes;

export function generateLibrary(seed: string, report: ProgressReporter) {
  const random = createRand(seed);
  report('generating game data...', 0);

  const terrains = makeTerrains();
  const objects = makeObjects();
  const recipes = makeRecipes();

  for (let type = 1; type <= NumFlowerTypes; type++) {
    const flowerColors = randomColors(random, NumFlowers,
      { type: 'uniform', min: 0.7, max: 1 },
      { type: 'uniform', min: 0.3, max: 0.7 }
    );
    for (let i = 0; i < NumFlowers; i++) {
      objects[`flower-${type}${i}`] = makeFlower(
        generateName(5, 10, random.random), type, flowerColors[i].toString(16)
      );
    }
  }

  for (let type = 1; type <= NumBerryTypes; type++) {
    const berryColors = randomColors(random, NumBerries,
      { type: 'uniform', min: 0.6, max: 1 },
      { type: 'uniform', min: 0.65, max: 0.8 }
    );
    for (let i = 0; i < NumBerries; i++) {
      objects[`berrybush-${type}${i}-depleted`] = makeBush();
      objects[`berrybush-${type}${i}`] = makeBerryBush(
        generateName(5, 10, random.random), `berrybush-${type}${i}-depleted`,
        type, berryColors[i].toString(16)
      );
    }
  }

  return loadDataLib(terrains, objects, recipes);
}