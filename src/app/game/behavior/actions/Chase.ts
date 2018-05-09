import { ActionKind, ActionState, BehaviorContext, BehaviorTree } from 'app/game/behavior';
import { Spatial, Stats } from 'app/game/traits';
import { tilePerSecond } from 'common/logic/stats';
import { vec2 } from 'gl-matrix';

const ChaseInterval = 250;

export interface Chase extends ActionState {
  readonly type: typeof Chase.Type;

  readonly targetId: number;

  interval: number;
  readonly velocity: [number, number];
}

export namespace Chase {
  export declare const _state: Chase;
  export const Type = 'chase';
  export const Kind = ActionKind.Movement;

  const direction = vec2.create();
  export function tick(this: BehaviorContext<Chase>, dt: number) {
    const { position, velocity } = this.self.traits.get(Spatial);

    if (this.state.interval < ChaseInterval) {
      this.state.interval += dt;
      vec2.copy(velocity, this.state.velocity);
      return;
    }
    this.state.interval = 0;

    const target = this.state.targetId ? this.game.entities.get(this.state.targetId) : this.game.player;
    if (!target) return;

    const { position: targetPosition } = target.traits.get(Spatial);
    const { spd } = Stats.compute(this.self.traits.get(Stats));

    vec2.subtract(direction, targetPosition, position);
    vec2.normalize(direction, direction);
    vec2.scale(velocity, direction, tilePerSecond(spd));
    this.state.velocity[0] = velocity[0];
    this.state.velocity[1] = velocity[1];
  }

  export function make(targetId = 0): Chase {
    return {
      type: Type,
      targetId,
      interval: 0,
      velocity: [0, 0]
    };
  }
}
BehaviorTree.registerAction(Chase);