import { cloneDeep, shuffle, sortBy, times } from 'lodash';

export const BatchSize = 8;
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
  const children = times(BatchSize - parents.length, () => {
    const parentsCopys = parents.slice();
    const a = parentsCopys.splice(Math.floor(Math.random() * parentsCopys.length), 1)[0];
    const b = parentsCopys.splice(Math.floor(Math.random() * parentsCopys.length), 1)[0];
    return algo.crossover(a, b);
  });

  // mutation
  const newParents = parents.map(instance =>
    Math.random() < MutationChance ? algo.mutate(instance) : cloneDeep(instance)
  );

  return shuffle([...newParents, ...children]);
}