import { BehaviorContext, BehaviorTree, ConditionState } from 'app/game/behavior';

export interface AtSpawn extends ConditionState {
  readonly type: typeof AtSpawn.Type;
}

export namespace AtSpawn {
  export declare const _state: AtSpawn;
  export const Type = 'at-spawn';

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