import { Message } from 'app/game/messages';
import { ItemSlot } from 'common/data';

export class InventoryUpdated implements Message {
  public readonly type = 'inventory-updated';

  constructor(
    public readonly slot: ItemSlot
  ) { }
}