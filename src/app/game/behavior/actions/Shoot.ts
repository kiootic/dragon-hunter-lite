import { ActionKind, ActionState, BehaviorContext, BehaviorTree } from 'app/game/behavior';
import { Attack } from 'app/game/messages';
import { Spatial } from 'app/game/traits';
import { Effect, Weapon } from 'common/data';
import { vec2 } from 'gl-matrix';

const ShootRadius = 10;

export interface Shoot extends ActionState {
  readonly type: typeof Shoot.Type;

  readonly numShoots: number;
  readonly angle: number;
  readonly weapon: Weapon;
  readonly effects: Effect[];
  readonly duration: number;

  cooldown: number;
}

export namespace Shoot {
  export declare const _state: Shoot;
  export const Type = 'shoot';
  export const Kind = ActionKind.Attack;

  const direction = vec2.create();
  const target = vec2.create();
  export function tick(this: BehaviorContext<Shoot>, dt: number) {
    if (this.state.cooldown > 0) {
      this.state.cooldown -= dt;
      return false;
    }
    this.state.cooldown = this.state.weapon.cooldown;

    const { position } = this.self.traits.get(Spatial);
    const { position: targetPosition } = this.game.player.traits.get(Spatial);
    vec2.subtract(direction, targetPosition, position);
    const distance = vec2.length(direction);
    if (distance > ShootRadius) return false;

    vec2.normalize(direction, direction);
    const beginAngle = -((this.state.numShoots - 1) * this.state.angle) / 2 +
      ((this.state.numShoots + 1) % 2) * this.state.angle / 2;
    for (let i = 0; i < this.state.numShoots; i++) {
      const angle = beginAngle + this.state.angle * i;
      target[0] = direction[0] * Math.cos(angle) - direction[1] * Math.sin(angle);
      target[1] = direction[0] * Math.sin(angle) + direction[1] * Math.cos(angle);
      vec2.add(target, target, position);
      this.game.dispatch(new Attack(
        this.self.id, this.state.weapon, target,
        this.state.effects, this.state.duration
      ));
    }
    return true;
  }

  export function make(weapon: Weapon, effects: Effect[], duration: number, numShoots = 1, angle = 15): Shoot {
    return {
      type: Type,
      weapon,
      effects,
      duration,
      numShoots,
      angle: angle * Math.PI / 180,
      cooldown: 0
    };
  }
}
BehaviorTree.registerAction(Shoot);