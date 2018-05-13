import { ActionKind, ActionState, BehaviorContext, BehaviorTree } from 'app/game/behavior';
import { ApplyEffects } from 'app/game/messages';
import { Effect } from 'common/data';

export interface Buff extends ActionState {
  readonly type: typeof Buff.Type;

  readonly targetId: number;
  readonly interval: number;
  readonly effects: Effect[];

  cooldown: number;
}

export namespace Buff {
  export declare const _state: Buff;
  export const Type = 'buff';
  export const Kind = ActionKind.Effect;

  export function tick(this: BehaviorContext<Buff>, dt: number) {
    if (this.state.cooldown > 0) {
      this.state.cooldown -= dt;
      return false;
    }
    this.state.cooldown = this.state.cooldown;

    this.game.dispatch(new ApplyEffects(this.state.targetId || this.self.id, this.state.effects.slice()));
    return true;
  }

  export function make(effects: Effect[], cooldown: number, targetId = 0): Buff {
    return {
      type: Type,
      targetId,
      interval: cooldown,
      effects,
      cooldown: 0
    };
  }
}
BehaviorTree.registerAction(Buff);