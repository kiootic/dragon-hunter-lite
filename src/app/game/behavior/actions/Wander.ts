import { ActionKind, ActionState, BehaviorContext, BehaviorTree } from 'app/game/behavior';
import { Spatial, Stats } from 'app/game/traits';
import { tilePerSecond } from 'common/logic/stats';
import { vec2 } from 'gl-matrix';
import { cloneDeep } from 'lodash';

const WanderInterval = 200;

export interface Wander extends ActionState {
  readonly type: typeof Wander.Type;

  interval: number;
  readonly velocity: [number, number];
}

export namespace Wander {
  export declare const _state: Wander;
  export const Type = 'wander';
  export const Kind = ActionKind.Movement;

  export function mutate(state: Wander) {
    return cloneDeep(state);
  }

  export function tick(this: BehaviorContext<Wander>, dt: number) {
    const { velocity } = this.self.traits.get(Spatial);

    if (this.state.interval > 0) {
      this.state.interval -= dt;
      vec2.copy(velocity, this.state.velocity);
      return true;
    }
    this.state.interval = WanderInterval;

    const { spd } = Stats.compute(this.self.traits.get(Stats));
    vec2.random(velocity);
    vec2.scale(velocity, velocity, tilePerSecond(spd * 0.5));
    this.state.velocity[0] = velocity[0];
    this.state.velocity[1] = velocity[1];
    return true;
  }

  export function make(): Wander {
    return {
      type: Type,
      interval: 0,
      velocity: [0, 0]
    };
  }
}
BehaviorTree.registerAction(Wander);