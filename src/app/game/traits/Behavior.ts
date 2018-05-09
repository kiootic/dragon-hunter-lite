import { BehaviorTree } from 'app/game/behavior';
import { Trait } from 'app/game/traits';
import { defaults } from 'lodash';

export interface Behavior extends Trait {
  readonly type: typeof Behavior.Type;
  readonly behaviors: BehaviorTree;
}

export namespace Behavior {
  export declare const _mark: Behavior;
  export const Type = 'behavior';

  export function make(behaviors: BehaviorTree): Behavior {
    return {
      type: Behavior.Type,
      behaviors
    };
  }

  export function serialize(trait: Behavior) {
    return {
      behaviors: trait.behaviors,
    };
  }

  export function deserialize(data: any, trait: Behavior): Behavior {
    return defaults({
      behaviors: data.behaviors,
    }, trait);
  }
}
Trait.types.set(Behavior.Type, Behavior);