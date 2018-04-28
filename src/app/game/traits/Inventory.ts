import { Trait } from 'app/game/traits';
import { Item } from 'common/data';
import { defaults } from 'lodash';

export interface Inventory extends Trait {
  readonly type: typeof Inventory.Type;
  readonly content: (Item | null)[];
}

export namespace Inventory {
  export declare const _mark: Inventory;
  export const Type = 'inventory';

  export function make(size = 1): Inventory {
    return {
      type: Inventory.Type,
      content: new Array(size).fill(null)
    };
  }

  export function serialize(trait: Inventory) {
    return {
      content: trait.content
    };
  }

  export function deserialize(data: any): Inventory {
    return defaults({
      content: data.content.slice()
    }, make());
  }
}
Trait.types.set(Inventory.Type, Inventory);