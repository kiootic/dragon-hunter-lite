import { Trait } from 'app/game/traits';
import { DropTable, TextureDef } from 'common/data';
import { defaults } from 'lodash';

export interface EnemyData extends Trait {
  readonly type: typeof EnemyData.Type;
  name: string;
  texture: TextureDef;
  drops: DropTable;
}

export namespace EnemyData {
  export declare const _mark: EnemyData;
  export const Type = 'enemy-data';

  export function make(): EnemyData {
    return {
      type: EnemyData.Type,
      name: '',
      texture: '',
      drops: { numDrops: { type: 'constant', value: 0 }, items: [] }
    };
  }

  export function serialize(trait: EnemyData) {
    return {
      name: trait.name,
      texture: trait.texture,
      drops: trait.drops,
    };
  }

  export function deserialize(data: any, trait: EnemyData): EnemyData {
    return defaults({
      name: data.name,
      texture: data.texture,
      drops: data.drops,
    }, trait);
  }
}
Trait.types.set(EnemyData.Type, EnemyData);