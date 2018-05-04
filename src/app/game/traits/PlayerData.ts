import { Trait } from 'app/game/traits';
import { defaults } from 'lodash';

export interface PlayerData extends Trait {
  readonly type: typeof PlayerData.Type;
  hotbarSelection: number;
}

export namespace PlayerData {
  export declare const _mark: PlayerData;
  export const Type = 'player-data';

  export function make(): PlayerData {
    return {
      type: PlayerData.Type,
      hotbarSelection: 0
    };
  }

  export function serialize(trait: PlayerData) {
    return {
      hotbarSelection: trait.hotbarSelection
    };
  }

  export function deserialize(data: any): PlayerData {
    return defaults({
      hotbarSelection: data.hotbarSelection || 0
    }, make());
  }
}
Trait.types.set(PlayerData.Type, PlayerData);