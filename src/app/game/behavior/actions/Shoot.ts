import { ActionKind, ActionState, BehaviorContext, BehaviorTree } from 'app/game/behavior';
import { Attack } from 'app/game/messages';
import { Spatial } from 'app/game/traits';
import { Effect, Weapon } from 'common/data';
import { vec2 } from 'gl-matrix';
import { clamp, cloneDeep } from 'lodash';

const ShootRadius = 12;

export interface Shoot extends ActionState {
  readonly type: typeof Shoot.Type;

  readonly numShoots: number;
  readonly angle: number;
  readonly offset: number;
  readonly weapon: Weapon;
  readonly effects: Effect[];
  readonly duration: number;
  readonly delay: number;

  cooldown: number;
}

export namespace Shoot {
  export declare const _state: Shoot;
  export const Type = 'shoot';
  export const Kind = ActionKind.Attack;

  export function mutate(state: Shoot) {
    const isRing = Math.abs((state.angle * state.numShoots) - Math.PI * 2) < 0.0001;
    const mutateType = Math.floor(Math.random() * 3);
    const newState = cloneDeep(state);

    switch (mutateType) {
      case 0: // cooldown
        Object.assign(newState, {
          duration: clamp(newState.duration * (1 + (Math.random() * 2 - 1) * 0.25), 500, 5000),
          delay: clamp(newState.delay * (1 + (Math.random() * 2 - 1) * 0.25), 0, 5000),
        });
        break;
      case 1: // shoots
        const numShoots = clamp(newState.numShoots + Math.floor(Math.random() * 6 - 3), 0, 10);
        Object.assign(newState, {
          numShoots,
          angle: isRing ? Math.PI * 2 / numShoots : newState.angle
        });
        break;
      case 2: // angle
        Object.assign(newState, {
          angle: clamp(newState.angle + (Math.random() - 0.5), 0, Math.PI * 2 / newState.numShoots)
        });
        break;
      case 3: // range
        Object.assign(newState.weapon, {
          range: clamp(newState.weapon.range + (Math.random() * 4 - 2), 2, 15)
        });
        break;
      case 4: // strength
        Object.assign(newState.weapon, {
          strength: clamp(newState.weapon.strength + (Math.random() * 6 - 3), 1, 50)
        });
        break;
    }
    Object.assign(newState.weapon, { type: Math.random() < 0.5 ? Weapon.Type.Bolt : Weapon.Type.Orb });
    newState.cooldown = newState.delay;
    return newState;
  }

  export function dump(state: Shoot) {
    const texts: any[] = [];
    texts.push(`Shoot ${state.numShoots} projectiles of damage ${state.weapon.strength.toFixed(1)}`);
    if (state.numShoots > 1) {
      texts.push(`with angle ${(state.angle * 180 / Math.PI).toFixed(1)}`);
    }
    texts.push(`, reaches ${state.weapon.range.toFixed(1)} in ${(state.duration / 1000).toFixed(2)} seconds`);
    return texts.join(' ');
  }

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

  export function make(
    weapon: Weapon, effects: Effect[], duration: number,
    numShoots = 1, angle = 15, offset = 0, delay = 0
  ): Shoot {
    return {
      type: Type,
      weapon,
      effects,
      duration,
      numShoots,
      angle: angle * Math.PI / 180,
      offset,
      delay,
      cooldown: delay
    };
  }
}
BehaviorTree.registerAction(Shoot);