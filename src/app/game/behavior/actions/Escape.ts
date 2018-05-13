import { ActionKind, ActionState, BehaviorContext, BehaviorTree } from 'app/game/behavior';
import { Spatial, Stats } from 'app/game/traits';
import { tilePerSecond } from 'common/logic/stats';
import { vec2 } from 'gl-matrix';

const EscapeRadius = 8;

export interface Escape extends ActionState {
  readonly type: typeof Escape.Type;

  readonly targetId: number;
  readonly velocity: [number, number];
}

export namespace Escape {
  export declare const _state: Escape;
  export const Type = 'escape';
  export const Kind = ActionKind.Movement;

  const direction = vec2.create();
  export function tick(this: BehaviorContext<Escape>, dt: number) {
    const { position, velocity } = this.self.traits.get(Spatial);

    const target = this.state.targetId ? this.game.entities.get(this.state.targetId) : this.game.player;
    if (!target) return false;

    const { position: targetPosition } = target.traits.get(Spatial);

    vec2.subtract(direction, targetPosition, position);
    const distance = vec2.length(direction);
    if (distance > EscapeRadius) return false;

    const { spd } = Stats.compute(this.self.traits.get(Stats));
    vec2.normalize(direction, direction);
    vec2.scale(velocity, direction, -tilePerSecond(spd * 0.5));
    this.state.velocity[0] = velocity[0];
    this.state.velocity[1] = velocity[1];
    return true;
  }

  export function make(targetId = 0): Escape {
    return {
      type: Type,
      targetId,
      velocity: [0, 0]
    };
  }
}
BehaviorTree.registerAction(Escape);