import { Foswig } from 'common/lib/foswig';
import { SpeciesNames } from 'data/names';
import { startCase } from 'lodash';

const nameMarkov = new Foswig(3);
nameMarkov.addWordsToChain(SpeciesNames);

export function generateName(min: number, max: number, random = Math.random) {
  return startCase(nameMarkov.generateWord(min, max, false, undefined, random));
}