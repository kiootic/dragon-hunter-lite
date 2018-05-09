import { BehaviorContext, BehaviorTree, ConditionState } from 'app/game/behavior';
import { Stats } from 'app/game/traits';

export interface HP extends ConditionState {
  readonly type: typeof HP.Type;

  readonly targetId: number;
  readonly threshold: number;
  readonly isGreater: boolean;
}

export namespace HP {
  export declare const _state: HP;
  export const Type = 'hp';

  export function isFulfilled(this: BehaviorContext<HP>) {
    const target = this.state.targetId ? this.game.entities.get(this.state.targetId) : this.self;
    if (!target) return false;

    const { hp, maxHp } = Stats.compute(target.traits.get(Stats));
    if (this.state.isGreater)
      return (hp / maxHp) > this.state.threshold;
    else
      return (hp / maxHp) <= this.state.threshold;
  }

  export function greaterThan(threshold: number, targetId = 0): HP {
    return {
      type: Type,
      threshold: threshold,
      isGreater: true,
      targetId
    };
  }

  export function lessThan(threshold: number, targetId = 0): HP {
    return {
      type: Type,
      threshold: threshold,
      isGreater: false,
      targetId
    };
  }
}
BehaviorTree.registerCondition(HP);