import { Command } from 'app/game/commands';
import { InventoryUpdated } from 'app/game/messages';
import { Inventory } from 'app/game/traits';

export class ClearInventory extends Command {
  readonly name = 'clear-inv';

  exec() {
    const { slots } = this.game.player.traits.get(Inventory);
    for (const slot of slots) {
      slot.item = null;
      this.game.dispatch(new InventoryUpdated(slot));
    }
    this.log('inventory cleared.');
  }
}
Command.register(new ClearInventory());