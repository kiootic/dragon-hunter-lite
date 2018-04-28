import { Message } from 'app/game/messages';
import { ItemSlot } from 'common/data';

export class InventorySwap implements Message {
  public readonly type = 'inventory-swap';

  constructor(
    public readonly slotA: ItemSlot,
    public readonly slotB: ItemSlot
  ) { }
}