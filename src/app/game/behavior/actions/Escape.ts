import { ActionKind, ActionState, BehaviorContext, BehaviorTree } from 'app/game/behavior';
import { computeVelocity } from 'app/game/behavior/utils';
import { Spatial } from 'app/game/traits';
import { vec2 } from 'gl-matrix';

const EscapeRadius = 8;

export interface Escape extends ActionState {
  readonly type: typeof Escape.Type;

  readonly targetId: number;
}

export namespace Escape {
  export declare const _state: Escape;
  export const Type = 'escape';
  export const Kind = ActionKind.Movement;

  export function tick(this: BehaviorContext<Escape>, dt: number) {
    const { position, velocity } = this.self.traits.get(Spatial);

    const target = this.state.targetId ? this.game.entities.get(this.state.targetId) : this.game.player;
    if (!target) return false;

    const { position: targetPosition } = target.traits.get(Spatial);

    vec2.subtract(velocity, targetPosition, position);
    const distance = vec2.length(velocity);
    if (distance > EscapeRadius) return false;

    vec2.normalize(velocity, velocity);
    vec2.scale(velocity,velocity, -0.5);
    computeVelocity(velocity, velocity, this.self);
    return true;
  }

  export function make(targetId = 0): Escape {
    return {
      type: Type,
      targetId
    };
  }
}
BehaviorTree.registerAction(Escape);