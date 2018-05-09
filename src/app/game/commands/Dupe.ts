import { Command } from 'app/game/commands';
import { ItemDrop } from 'app/game/entities';
import { Inventory, PlayerData } from 'app/game/traits';

export class Dupe extends Command {
  readonly name = 'dupe';

  exec(count: string) {
    let numItems = Number(count) || 1;

    const { hotbarSelection: sel } = this.game.player.traits.get(PlayerData);
    const { slots } = this.game.player.traits.get(Inventory);
    const item = slots[sel].item;
    if (!item) return;

    while (numItems-- > 0) {
      const drop = ItemDrop.make(this.game, item);
      drop.age = 10000;
      this.game.entities.add(drop);
    }
  }
}
Command.register(new Dupe());