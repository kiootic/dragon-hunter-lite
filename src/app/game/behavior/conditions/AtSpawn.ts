import { BehaviorContext, BehaviorTree, ConditionState } from 'app/game/behavior';
import { cloneDeep } from 'lodash';

export interface AtSpawn extends ConditionState {
  readonly type: typeof AtSpawn.Type;
}

export namespace AtSpawn {
  export declare const _state: AtSpawn;
  export const Type = 'at-spawn';

  export function mutate(state: AtSpawn) {
    return cloneDeep(state);
  }

  export function dump(state: AtSpawn) {
    return 'at spawn';
  }

  export function isFulfilled(this: BehaviorContext<AtSpawn>) {
    return this.self.age === 0;
  }

  export function make(): AtSpawn {
    return {
      type: Type
    };
  }
}
BehaviorTree.registerCondition(AtSpawn);