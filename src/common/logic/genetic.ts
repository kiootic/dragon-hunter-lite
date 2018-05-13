import { cloneDeep, shuffle, sortBy, times } from 'lodash';

export const BatchSize = 10;
export const SelectionSize = 0.5;
export const MutationChance = 0.5;

export interface GeneticAlgorithm<Instance> {
  seed(): Instance
  evaluate(instance: Instance): number;
  crossover(a: Instance, b: Instance): Instance;
  mutate(instance: Instance): Instance;
}

export function begin<Instance>(algo: GeneticAlgorithm<Instance>) {
  return times(BatchSize, () => algo.seed());
}

export function nextGeneration<Instance>(algo: GeneticAlgorithm<Instance>, batch: Instance[]) {
  // selection
  const parents = sortBy(batch, instance => -algo.evaluate(instance))
    .slice(BatchSize * SelectionSize);

  // crossover
  const randomParent = () => parents[Math.floor(Math.random() * parents.length)];
  const children = times(BatchSize - parents.length, () =>
    algo.crossover(randomParent(), randomParent())
  );

  // mutation
  const newParents = parents.map(instance =>
    Math.random() < MutationChance ? algo.mutate(instance) : cloneDeep(instance)
  );

  return shuffle([...newParents, ...children]);
}