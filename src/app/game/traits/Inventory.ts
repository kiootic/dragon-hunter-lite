import { Trait } from 'app/game/traits';
import { ItemSlot } from 'common/data';
import { defaults, times } from 'lodash';

export interface Inventory extends Trait {
  readonly type: typeof Inventory.Type;
  readonly slots: ItemSlot[];
}

export namespace Inventory {
  export declare const _mark: Inventory;
  export const Type = 'inventory';

  export function make(size = 1): Inventory {
    return {
      type: Inventory.Type,
      slots: times(size, (): ItemSlot => ({ item: null, accepts: null }))
    };
  }

  export function serialize(trait: Inventory) {
    return {
      slots: trait.slots
    };
  }

  export function deserialize(data: any): Inventory {
    return defaults({
      slots: data.slots.slice()
    }, make());
  }
}
Trait.types.set(Inventory.Type, Inventory);