import { cloneDeep, set } from 'lodash';

export interface Constant {
  type: 'constant';
  value: number;
}

export interface UniformRandom {
  type: 'uniform';
  min: number;
  max: number;
}

export interface ExponentialRandom {
  type: 'exponential';
  rate: number;
  min?: number;
  max?: number;
}

export interface GaussianRandom {
  type: 'gaussian';
  mean: number;
  sd: number;
  min?: number;
  max?: number;
}

export type RandomValue = Constant | UniformRandom | ExponentialRandom | GaussianRandom;
export type RandomSubst = { path: string } & RandomValue;

export interface RandomTemplate<T> {
  template: T;
  substs: RandomSubst[];
}

export function randomValue(value: RandomValue, random = Math.random) {
  switch (value.type) {
    case 'constant': return value.value;
    case 'uniform': return value.min + random() * (value.max - value.min);
    case 'exponential': return exponentialRandom(value.rate, value.min, value.max, random);
    case 'gaussian': return gaussianRandom(value.mean, value.sd, value.min, value.max, random);
  }
}

export function instantiate<T>(template: RandomTemplate<T>, random = Math.random) {
  const obj = cloneDeep(template.template);
  for (const subst of template.substs)
    set(obj as any, subst.path, randomValue(subst));
  return obj;
}

// https://stackoverflow.com/a/2106564
export function exponentialRandom(rate: number, min?: number, max?: number, random = Math.random) {
  let x = Math.log(1 - random()) / -rate;
  if (min !== undefined) x = Math.max(min, x);
  if (max !== undefined) x = Math.min(max, x);
  return x;
}

// https://stackoverflow.com/a/36481059
export function gaussianRandom(
  mean: number, sd: number, min?: number, max?: number, random = Math.random
) {
  let u, v;
  do { u = random(); } while (u === 0);
  do { v = random(); } while (v === 0);
  let x = mean + sd * (Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v));
  if (min !== undefined) x = Math.max(min, x);
  if (max !== undefined) x = Math.min(max, x);
  return x;
}