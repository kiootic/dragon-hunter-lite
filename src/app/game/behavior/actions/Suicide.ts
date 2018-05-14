import { ActionKind, ActionState, BehaviorContext, BehaviorTree } from 'app/game/behavior';
import { cloneDeep } from 'lodash';

export interface Suicide extends ActionState {
  readonly type: typeof Suicide.Type;
}

export namespace Suicide {
  export declare const _state: Suicide;
  export const Type = 'suicide';
  export const Kind = ActionKind.Effect;

  export function mutate(state: Suicide) {
    return cloneDeep(state);
  }

  export function dump(state: Suicide) {
    return 'Destroy self';
  }

  export function tick(this: BehaviorContext<Suicide>, dt: number) {
    this.self.delete();
    return true;
  }

  export function make(targetId = 0): Suicide {
    return {
      type: Type
    };
  }
}
BehaviorTree.registerAction(Suicide);