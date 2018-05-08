import { Trait } from 'app/game/traits';
import { defaults } from 'lodash';

export interface PlayerData extends Trait {
  readonly type: typeof PlayerData.Type;
  stunDuration: number;
  hotbarSelection: number;
}

export namespace PlayerData {
  export declare const _mark: PlayerData;
  export const Type = 'player-data';

  export function make(): PlayerData {
    return {
      type: PlayerData.Type,
      stunDuration: 0,
      hotbarSelection: 0
    };
  }

  export function serialize(trait: PlayerData) {
    return {
      stunDuration: trait.stunDuration,
      hotbarSelection: trait.hotbarSelection
    };
  }

  export function deserialize(data: any): PlayerData {
    return defaults({
      stunDuration: data.stunDuration || 0,
      hotbarSelection: data.hotbarSelection || 0
    }, make());
  }
}
Trait.types.set(PlayerData.Type, PlayerData);