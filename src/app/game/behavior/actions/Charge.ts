import { ActionKind, ActionState, BehaviorContext, BehaviorTree } from 'app/game/behavior';
import { Spatial, Stats } from 'app/game/traits';
import { tilePerSecond } from 'common/logic/stats';
import { vec2 } from 'gl-matrix';

const ChargeCooldown = 2000;

export interface Charge extends ActionState {
  readonly type: typeof Charge.Type;

  readonly targetId: number;

  interval: number;
  cooldown: number;
  readonly velocity: [number, number];
}

export namespace Charge {
  export declare const _state: Charge;
  export const Type = 'charge';
  export const Kind = ActionKind.Movement;

  const direction = vec2.create();
  export function tick(this: BehaviorContext<Charge>, dt: number) {
    const { position, velocity } = this.self.traits.get(Spatial);

    const target = this.state.targetId ? this.game.entities.get(this.state.targetId) : this.game.player;
    if (!target) return false;

    if (this.state.interval > 0) {
      this.state.interval -= dt;
      vec2.copy(velocity, this.state.velocity);
      return true;
    } else if (this.state.cooldown > 0) {
      this.state.cooldown -= dt;
      return false;
    }
    this.state.cooldown = ChargeCooldown;

    const { position: targetPosition } = target.traits.get(Spatial);
    const { spd } = Stats.compute(this.self.traits.get(Stats));
    const speed = tilePerSecond(spd * 10);
    vec2.subtract(direction, targetPosition, position);
    this.state.interval = (vec2.length(direction) + 5) / speed * 1000;
    vec2.normalize(direction, direction);
    vec2.scale(velocity, direction, speed);
    this.state.velocity[0] = velocity[0];
    this.state.velocity[1] = velocity[1];
    return true;
  }

  export function make(targetId = 0): Charge {
    return {
      type: Type,
      targetId,
      interval: 0,
      cooldown: 0,
      velocity: [0, 0]
    };
  }
}
BehaviorTree.registerAction(Charge);