import { Action, ActionKind, ActionState, Condition, ConditionState } from 'app/game/behavior';
import { Entity } from 'app/game/entities';
import { Stats } from 'app/game/traits';

interface TreeAction extends ActionState {
  _active: boolean;
}
interface TreeCondition extends ConditionState {
  _actions: TreeAction[];
}

export interface BehaviorTree {
  readonly conditions: TreeCondition[];
}

export namespace BehaviorTree {
  const actions = new Map<string, Action<any>>();
  const conditions = new Map<string, Condition<any>>();

  export function registerAction(action: Action<any>) {
    actions.set(action.Type, action);
  }
  export function registerCondition(condition: Condition<any>) {
    conditions.set(condition.Type, condition);
  }

  export function run(self: Entity, dt: number, tree: BehaviorTree) {
    const context = {
      game: self.game,
      self,
      state: undefined as any
    };
    for (const conditionState of tree.conditions) {
      const condition = conditions.get(conditionState.type)!;
      context.state = conditionState;

      const fulfilled = condition.isFulfilled.call(context);
      for (const actionState of conditionState._actions) {
        const action = actions.get(actionState.type)!;
        context.state = actionState;
        let actionFulfilled = fulfilled;
        if (action.Kind === ActionKind.Movement)
          actionFulfilled = actionFulfilled && Stats.canMove(self.traits.get(Stats));

        if (actionFulfilled && !actionState._active) {
          action.begin && action.begin.call(context);
          actionState._active = true;
        }
        if (!actionFulfilled && actionState._active) {
          action.end && action.end.call(context);
          actionState._active = false;
        }
        if (actionState._active)
          action.tick.call(context, dt);
      }
    }
  }
}