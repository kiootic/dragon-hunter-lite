import { Message } from 'app/game/messages';
import { Item } from 'common/data';

export class InventorySwap implements Message {
  public readonly type = 'inventory-swap';

  constructor(
    public readonly indexA: number,
    public readonly indexB: number
  ) { }
}