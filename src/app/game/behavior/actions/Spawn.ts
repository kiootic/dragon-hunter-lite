import { ActionKind, ActionState, BehaviorContext, BehaviorTree } from 'app/game/behavior';
import { SpawnEnemy } from 'app/game/messages';
import { Spatial } from 'app/game/traits';
import { cloneDeep } from 'lodash';

export interface Spawn extends ActionState {
  readonly type: typeof Spawn.Type;

  readonly enemyType: string;
  readonly interval: number;

  cooldown: number;
}

export namespace Spawn {
  export declare const _state: Spawn;
  export const Type = 'spawn';
  export const Kind = ActionKind.Effect;

  export function mutate(state: Spawn) {
    return cloneDeep(state);
  }

  export function dump(state: Spawn) {
    return `Spawn ${state.enemyType}`;
  }

  export function tick(this: BehaviorContext<Spawn>, dt: number) {
    if (this.state.cooldown > 0) {
      this.state.cooldown -= dt;
      return false;
    }
    this.state.cooldown = this.state.cooldown;

    this.game.dispatch(new SpawnEnemy(
      this.state.enemyType,
      this.self.traits.get(Spatial).position
    ));
    return true;
  }

  export function make(enemyType: string, cooldown: number): Spawn {
    return {
      type: Type,
      enemyType: enemyType.toLowerCase(),
      interval: cooldown,
      cooldown: 0
    };
  }
}
BehaviorTree.registerAction(Spawn);