import { ActionKind, ActionState, BehaviorContext, BehaviorTree } from 'app/game/behavior';
import { computeVelocity } from 'app/game/behavior/utils';
import { Spatial } from 'app/game/traits';
import { vec2 } from 'gl-matrix';
import { cloneDeep } from 'lodash';

const ChaseInterval = 250;
const ChaseRadius = 8;

export interface Chase extends ActionState {
  readonly type: typeof Chase.Type;

  readonly targetId: number;

  interval: number;
  readonly direction: [number, number];
}

export namespace Chase {
  export declare const _state: Chase;
  export const Type = 'chase';
  export const Kind = ActionKind.Movement;

  export function mutate(state: Chase) {
    return cloneDeep(state);
  }

  const direction = vec2.create();
  export function tick(this: BehaviorContext<Chase>, dt: number) {
    const { position, velocity } = this.self.traits.get(Spatial);

    const target = this.state.targetId ? this.game.entities.get(this.state.targetId) : this.game.player;
    if (!target) return false;

    const { position: targetPosition } = target.traits.get(Spatial);

    vec2.subtract(direction, targetPosition, position);
    const distance = vec2.length(direction);
    if (distance > ChaseRadius) return false;

    if (this.state.interval > 0) {
      this.state.interval -= dt;
      computeVelocity(velocity, this.state.direction, this.self);
      return true;
    }
    this.state.interval = ChaseInterval;

    vec2.normalize(direction, direction);
    computeVelocity(velocity, this.state.direction, this.self);
    this.state.direction[0] = direction[0];
    this.state.direction[1] = direction[1];
    return true;
  }

  export function make(targetId = 0): Chase {
    return {
      type: Type,
      targetId,
      interval: 0,
      direction: [0, 0]
    };
  }
}
BehaviorTree.registerAction(Chase);