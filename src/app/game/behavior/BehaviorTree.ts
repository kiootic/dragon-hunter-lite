import { Action, ActionKind, ActionState, Condition, ConditionState } from 'app/game/behavior';
import { Entity } from 'app/game/entities';
import { Stats } from 'app/game/traits';

interface BehaviorState {
  readonly condition: ConditionState;
  readonly actions: ActionState[];
}

export interface BehaviorTree {
  readonly states: BehaviorState[];
  activeStateIndex: number;
}

export namespace BehaviorTree {
  export const actions = new Map<string, Action<any>>();
  export const conditions = new Map<string, Condition<any>>();

  export function registerAction(action: Action<any>) {
    actions.set(action.Type, action);
  }
  export function registerCondition(condition: Condition<any>) {
    conditions.set(condition.Type, condition);
  }

  export function dump(tree: BehaviorTree) {
    return tree.states.map(state => {
      const texts :string[] = [];
      texts.push(`When ${conditions.get(state.condition.type)!.dump(state.condition)}:`);
      for (const action of state.actions) {
        texts.push('  ' + actions.get(action.type)!.dump(action));
      }
      return texts.join('\n');
    }).join('\n\n');
  }

  export function run(self: Entity, dt: number, tree: BehaviorTree) {
    const context = {
      game: self.game,
      self,
      state: undefined as any
    };

    // state transitions
    let active = tree.activeStateIndex;
    for (let i = 0; i < tree.states.length; i++) {
      const condition = conditions.get(tree.states[i].condition.type)!;
      context.state = tree.states[i].condition;
      const fulfilled = condition.isFulfilled.call(context);
      if (fulfilled)
        active = i;
    }
    if (active < 0) active = 0;

    // activate/deactivate state
    if (active !== tree.activeStateIndex) {
      if (tree.activeStateIndex >= 0)
        for (const actionState of tree.states[tree.activeStateIndex].actions) {
          const action = actions.get(actionState.type)!;
          context.state = actionState;
          action.end && action.end.call(context);
        }

      for (const actionState of tree.states[active].actions) {
        const action = actions.get(actionState.type)!;
        context.state = actionState;
        action.begin && action.begin.call(context);
      }
      tree.activeStateIndex = active;
    }

    // perform state actions
    let moved = false;
    for (const actionState of tree.states[active].actions) {
      const action = actions.get(actionState.type)!;
      context.state = actionState;

      if (action.Kind === ActionKind.Movement && (moved || !Stats.canMove(self.traits.get(Stats))))
        continue;

      const ok = action.tick.call(context, dt);
      if (ok && action.Kind === ActionKind.Movement)
        moved = true;
    }
  }
}