import { Game } from 'app/game';
import { ItemDrop } from 'app/game/entities';
import { EntityCollision, InventorySwap, InventoryUpdated } from 'app/game/messages';
import { Task } from 'app/game/tasks';
import { Inventory, Spatial } from 'app/game/traits';
import { Item, ItemSlot } from 'common/data';
import { vec2 } from 'gl-matrix';

const MinInteractAge = 350;

export class InventoryTask extends Task {
  public readonly runWhenPaused = true;

  private readonly playerPos: vec2;
  private readonly playerInv: ItemSlot[];

  constructor(game: Game) {
    super(game);
    game.messages$.ofType(InventorySwap).subscribe(this.swapInventory);
    game.messages$.ofType(EntityCollision).subscribe(this.entityCollided);
    this.playerPos = game.player.traits.get(Spatial).position;
    this.playerInv = game.player.traits.get(Inventory).slots;
  }

  update(dt: number) {
    for (const itemDrop of this.game.entities.ofType(ItemDrop)) {
      const { slots } = itemDrop.traits.get(Inventory);
      if (!this.canPickUp(slots[0].item!)) continue;

      const spatial = itemDrop.traits.get(Spatial);
      const d = vec2.dist(spatial.position, this.playerPos);

      if (itemDrop.age >= MinInteractAge && d > 0.5 && d < 3.5) {
        // magnet (faster if nearer)
        vec2.sub(spatial.velocity, this.playerPos, spatial.position);
        const len = vec2.len(spatial.velocity);
        vec2.normalize(spatial.velocity, spatial.velocity);
        vec2.scale(spatial.velocity, spatial.velocity, 5 / (len * len));
      }
    }
  }

  private entityCollided = ({ entityIdA, entityIdB }: EntityCollision) => {
    const entityA = this.game.entities.get(entityIdA);
    const entityB = this.game.entities.get(entityIdB);
    let item;
    if (entityA instanceof ItemDrop && entityB === this.game.player) {
      item = entityA;
    } else if (entityA === this.game.player && entityB instanceof ItemDrop) {
      item = entityB;
    } else return;

    if (item.age >= MinInteractAge && this.pickUp(item.traits.get(Inventory).slots[0].item!))
      item.delete();
  }

  private acceptable(item: Item | null, accepts: Item.Type[] | string | null) {
    if (!item || !accepts) return true;
    if (typeof accepts === 'string')
      return !!item.id.match(accepts);
    else
      return accepts.indexOf(item.type) >= 0;
  }

  private canPickUp(item: Item) {
    for (const slot of this.playerInv) {
      if (slot.item) continue;
      if (this.acceptable(item, slot.accepts)) return true;
    }
    return false;
  }

  private pickUp(item: Item) {
    for (const slot of this.playerInv) {
      if (slot.item) continue;
      if (!this.acceptable(item, slot.accepts)) continue;

      slot.item = item;
      this.game.dispatch(new InventoryUpdated(slot));
      return true;
    }
    return false;
  }

  private swapInventory = (swap: InventorySwap) => {
    const { slotA, slotB } = swap;
    if (!this.acceptable(slotA.item, slotB.accepts) || !this.acceptable(slotB.item, slotA.accepts))
      return;
    const tmp = slotB.item;
    slotB.item = slotA.item;
    slotA.item = tmp;
    this.game.dispatch(new InventoryUpdated(slotA));
    this.game.dispatch(new InventoryUpdated(slotB));
  }
}