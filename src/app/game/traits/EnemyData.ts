import { Trait } from 'app/game/traits';
import { DropTable } from 'common/data';
import { defaults } from 'lodash';

export interface EnemyData extends Trait {
  readonly type: typeof EnemyData.Type;
  animation: string;
  drops: DropTable;
}

export namespace EnemyData {
  export declare const _mark: EnemyData;
  export const Type = 'enemy-data';

  export function make(animation: string): EnemyData {
    return {
      type: EnemyData.Type,
      animation,
      drops: { numDrops: { type: 'constant', value: 0 }, items: [] }
    };
  }

  export function serialize(trait: EnemyData) {
    return {
      animation: trait.animation,
      drops: trait.drops,
    };
  }

  export function deserialize(data: any, trait: EnemyData): EnemyData {
    return defaults({
      animation: data.animation || 0,
      drops: data.drops,
    }, trait);
  }
}
Trait.types.set(EnemyData.Type, EnemyData);