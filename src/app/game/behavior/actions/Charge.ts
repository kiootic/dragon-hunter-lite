import { ActionKind, ActionState, BehaviorContext, BehaviorTree } from 'app/game/behavior';
import { computeVelocity } from 'app/game/behavior/utils';
import { Spatial, Stats } from 'app/game/traits';
import { tilePerSecond } from 'common/logic/stats';
import { vec2 } from 'gl-matrix';
import { cloneDeep } from 'lodash';

const SpeedMultiplier = 5;

export interface Charge extends ActionState {
  readonly type: typeof Charge.Type;

  readonly targetId: number;

  interval: number;
  cooldown: number;
  readonly direction: [number, number];
}

export namespace Charge {
  export declare const _state: Charge;
  export const Type = 'charge';
  export const Kind = ActionKind.Movement;

  export function mutate(state: Charge) {
    return cloneDeep(state);
  }

  export function dump(state: Charge) {
    return 'Charge towards target';
  }

  const direction = vec2.create();
  export function tick(this: BehaviorContext<Charge>, dt: number) {
    const { position, velocity } = this.self.traits.get(Spatial);

    const target = this.state.targetId ? this.game.entities.get(this.state.targetId) : this.game.player;
    if (!target) return false;

    if (this.state.interval > 0) {
      this.state.interval -= dt;
      computeVelocity(velocity, this.state.direction, this.self);
      return true;
    } else if (this.state.cooldown > 0) {
      this.state.cooldown -= dt;
      return false;
    }

    const { position: targetPosition } = target.traits.get(Spatial);
    vec2.subtract(direction, targetPosition, position);
    const { spd } = Stats.compute(this.self.traits.get(Stats));
    this.state.interval = Math.min(3000, (vec2.length(direction) + 5) / (tilePerSecond(spd) * SpeedMultiplier) * 1000);
    this.state.cooldown = Math.max(2500, this.state.interval);

    vec2.normalize(direction, direction);
    vec2.scale(direction, direction, SpeedMultiplier);
    computeVelocity(velocity, direction, this.self);
    this.state.direction[0] = direction[0];
    this.state.direction[1] = direction[1];
    return true;
  }

  export function make(targetId = 0): Charge {
    return {
      type: Type,
      targetId,
      interval: 0,
      cooldown: 0,
      direction: [0, 0]
    };
  }
}
BehaviorTree.registerAction(Charge);