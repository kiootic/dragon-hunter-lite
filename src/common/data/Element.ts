import { RandomValue } from 'common/random';

export interface Element {
  readonly fusionThreshold: RandomValue;
  readonly fusionRate: RandomValue;

  readonly fissionThreshold: RandomValue;
  readonly fissionRate: RandomValue;

  readonly color: string;
}