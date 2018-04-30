import { Game } from 'app/game';
import { ItemDrop } from 'app/game/entities';
import { InventorySwap, InventoryUpdated } from 'app/game/messages';
import { Task } from 'app/game/tasks';
import { Inventory, Spatial } from 'app/game/traits';
import { Item, ItemSlot } from 'common/data';
import { vec2 } from 'gl-matrix';

export class InventoryTask extends Task {
  private readonly playerPos: vec2;
  private readonly playerInv: ItemSlot[];

  constructor(game: Game) {
    super(game);
    game.messages$.ofType(InventorySwap).subscribe(this.swapInventory);
    this.playerPos = game.player.traits(Spatial).position;
    this.playerInv = game.player.traits(Inventory).slots;
  }

  update(dt: number) {
    for (const itemDrop of this.game.entities.ofType(ItemDrop)) {
      const spatial = itemDrop.traits(Spatial);
      const d = vec2.dist(spatial.position, this.playerPos);

      if (itemDrop.age < 300 || d > 2.5) continue;

      if (d > 0.5) {
        // magnet
        vec2.sub(spatial.velocity, this.playerPos, spatial.position);
        vec2.scale(spatial.velocity, spatial.velocity, 1.5);
        continue;
      } else if (itemDrop.age < 750)
        continue;

      if (this.pickUp(itemDrop.traits(Inventory).slots[0].item!))
        itemDrop.delete();
    }
  }

  private pickUp(item: Item) {
    for (const slot of this.playerInv) {
      if (slot.item) continue;
      if (slot.accepts && slot.accepts.indexOf(item.type) < 0) continue;

      slot.item = item;
      this.game.dispatch(new InventoryUpdated(slot));
      return true;
    }
    return false;
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