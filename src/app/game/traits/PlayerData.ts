import { Trait } from 'app/game/traits';
import { defaults } from 'lodash';

export interface PlayerData extends Trait {
  readonly type: typeof PlayerData.Type;
  hotbarSelection: number;
  consumeCooldown: number;
  attackCooldown: number;
}

export namespace PlayerData {
  export declare const _mark: PlayerData;
  export const Type = 'player-data';

  export function make(): PlayerData {
    return {
      type: PlayerData.Type,
      hotbarSelection: 0,
      consumeCooldown: 0,
      attackCooldown: 0
    };
  }

  export function serialize(trait: PlayerData) {
    return {
      hotbarSelection: trait.hotbarSelection,
      consumeCooldown: trait.consumeCooldown,
      attackCooldown: trait.attackCooldown,
    };
  }

  export function deserialize(data: any, trait: PlayerData): PlayerData {
    return defaults({
      hotbarSelection: data.hotbarSelection || 0,
      consumeCooldown: data.consumeCooldown || 0,
      attackCooldown: data.attackCooldown || 0,
    }, trait);
  }
}
Trait.types.set(PlayerData.Type, PlayerData);