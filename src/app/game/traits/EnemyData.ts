import { Trait } from 'app/game/traits';
import { defaults } from 'lodash';

export interface EnemyData extends Trait {
  readonly type: typeof EnemyData.Type;
  animation: string;
}

export namespace EnemyData {
  export declare const _mark: EnemyData;
  export const Type = 'enemy-data';

  export function make(animation: string): EnemyData {
    return {
      type: EnemyData.Type,
      animation
    };
  }

  export function serialize(trait: EnemyData) {
    return {
      animation: trait.animation,
    };
  }

  export function deserialize(data: any, trait: EnemyData): EnemyData {
    return defaults({
      animation: data.animation || 0,
    }, trait);
  }
}
Trait.types.set(EnemyData.Type, EnemyData);