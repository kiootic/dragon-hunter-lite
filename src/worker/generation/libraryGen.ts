import { loadDataLib, Element } from 'common/data';
import { generateName } from 'common/markov';
import { Elements, ElementDef } from 'data/elements';
import { makeObjects } from 'data/objects';
import { makeRecipes } from 'data/recipes';
import { makeBerryBush, makeBush, makeFlower, NumBerryTypes, NumFlowerTypes } from 'data/template';
import { makeTerrains } from 'data/terrains';
import { fromPairs } from 'lodash';
import { create as createRand } from 'random-seed';
import { randomColors, randomElementPair } from 'worker/generation/utils';
import { ProgressReporter } from 'worker/generation/ProgressReporter';

const NumFlowers = 16 / NumFlowerTypes;
const NumBerries = 16 / NumBerryTypes;

export function generateLibrary(seed: string, report: ProgressReporter) {
  const random = createRand(seed);
  report('generating game data...', 0);

  const terrains = makeTerrains();
  const objects = makeObjects();
  const recipes = makeRecipes();

  const randomElementState: any[] = [];
  const flowerColors = randomColors(random, NumFlowers * NumFlowerTypes,
    { type: 'uniform', min: 0.5, max: 1 },
    { type: 'uniform', min: 0.8, max: 1 }
  );
  for (let type = 1; type <= NumFlowerTypes; type++) {
    for (let i = 0; i < NumFlowers; i++) {
      objects[`flower-${type}${i}`] = makeFlower(
        generateName(5, 10, random.random),
        type, flowerColors.pop()!.toString(16),
        randomElementPair(random, randomElementState)
      );
    }
  }

  const berryColors = randomColors(random, NumBerries * NumBerryTypes,
    { type: 'uniform', min: 0.3, max: 1 },
    { type: 'uniform', min: 0.7, max: 1 }
  );
  for (let type = 1; type <= NumBerryTypes; type++) {
    for (let i = 0; i < NumBerries; i++) {
      objects[`berrybush-${type}${i}-depleted`] = makeBush();
      objects[`berrybush-${type}${i}`] = makeBerryBush(
        generateName(5, 10, random.random),
        `berrybush-${type}${i}-depleted`,
        type, berryColors.pop()!.toString(16),
        randomElementPair(random, randomElementState)
      );
    }
  }

  const elemColors = randomColors(random, Elements.length);
  const elements: Record<ElementDef.Type, Element> = fromPairs(
    Elements.map(({ tier, name }): [string, Element] => {
      const fissionThreshold = random.random() * 6 + tier * 8;
      const fissionRate = 0.1 + 0.1 * (tier + 1) * random.random();
      const fusionThreshold = 10 + random.random() * 8 + tier * 10;
      const fusionRate = 0.2 + 0.1 * (ElementDef.MaxTier - tier + 1) * (random.random() + 1);
      const color = elemColors.pop()!.toString(16);

      return [name, {
        fissionThreshold: { type: 'gaussian', mean: fissionThreshold, sd: tier + 1, max: 8 * (tier + 1) },
        fusionThreshold: { type: 'gaussian', mean: fusionThreshold, sd: 2 * (tier + 1), min: 10 * tier },
        fissionRate: { type: 'gaussian', mean: fissionRate, sd: 0.05, min: 0, max: 0.8 },
        fusionRate: { type: 'gaussian', mean: fusionRate, sd: 0.05, min: 0, max: 0.8 },
        color
      }];
    }
    )) as any;

  return loadDataLib(terrains, objects, recipes, elements);
}