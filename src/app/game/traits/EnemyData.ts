import { Trait } from 'app/game/traits';
import { EnemyDef } from 'common/data';
import { defaults } from 'lodash';

export interface EnemyData extends Trait {
  readonly type: typeof EnemyData.Type;
  def: EnemyDef;
}

export namespace EnemyData {
  export declare const _mark: EnemyData;
  export const Type = 'enemy-data';

  export function make(def: EnemyDef): EnemyData {
    return {
      type: EnemyData.Type,
      def
    };
  }

  export function serialize(trait: EnemyData) {
    return {
      name: trait.def,
    };
  }

  export function deserialize(data: any, trait: EnemyData): EnemyData {
    return defaults({
      def: data.def,
    }, trait);
  }
}
Trait.types.set(EnemyData.Type, EnemyData);