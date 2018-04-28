import { Game } from 'app/game';
import { InventorySwap, InventoryUpdated } from 'app/game/messages';
import { Task } from 'app/game/tasks';
import { Item } from 'common/data';

export class InventoryTask extends Task {
  constructor(game: Game) {
    super(game);
    game.messages$.ofType(InventorySwap).subscribe(this.swapInventory);
  }

  update(dt: number) {
  }

  private swapInventory = (swap: InventorySwap) => {
    function acceptable(item: Item | null, accepts: Item.Type[] | null) {
      return !(item && accepts && accepts.indexOf(item.type) < 0);
    }

    const { slotA, slotB } = swap;
    if (!acceptable(slotA.item, slotB.accepts) || !acceptable(slotB.item, slotA.accepts))
      return;
    const tmp = slotB.item;
    slotB.item = slotA.item;
    slotA.item = tmp;
    this.game.dispatch(new InventoryUpdated(slotA));
    this.game.dispatch(new InventoryUpdated(slotB));
  }
}