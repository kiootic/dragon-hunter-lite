import { BehaviorContext, BehaviorTree, ConditionState } from 'app/game/behavior';
import { Spatial } from 'app/game/traits';
import { vec2 } from 'gl-matrix';

export interface Distance extends ConditionState {
  readonly type: typeof Distance.Type;

  readonly targetId: number;
  readonly threshold: number;
  readonly isGreater: boolean;
}

export namespace Distance {
  export declare const _state: Distance;
  export const Type = 'distance';

  export function mutate(state: Distance) {
    return {
      ...state,
      threshold: state.threshold + (Math.random() * 4 - 2)
    };
  }

  const dist = vec2.create();
  export function isFulfilled(this: BehaviorContext<Distance>) {
    const target = this.state.targetId ? this.game.entities.get(this.state.targetId) : this.game.player;
    if (!target) return false;

    const { position: a } = target.traits.get(Spatial);
    const { position: b } = this.self.traits.get(Spatial);
    vec2.sub(dist, a, b);
    const d = vec2.length(dist);

    if (this.state.isGreater)
      return d > this.state.threshold;
    else
      return d <= this.state.threshold;
  }

  export function greaterThan(threshold: number, targetId = 0): Distance {
    return {
      type: Type,
      threshold: threshold,
      isGreater: true,
      targetId
    };
  }

  export function lessThan(threshold: number, targetId = 0): Distance {
    return {
      type: Type,
      threshold: threshold,
      isGreater: false,
      targetId
    };
  }
}
BehaviorTree.registerCondition(Distance);