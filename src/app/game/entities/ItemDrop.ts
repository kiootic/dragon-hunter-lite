import { Game } from 'app/game';
import { Entity } from 'app/game/entities';
import { Float, Inventory, Spatial } from 'app/game/traits';
import { Item } from 'common/data';
import { vec2 } from 'gl-matrix';

export class ItemDrop extends Entity {
  public static _mark: ItemDrop;
  public static readonly Type = 'item-drop';
  public get type() { return ItemDrop.Type; }

  public static make(game: Game, item: Item, position: vec2) {
    const entity = new ItemDrop(game).item(item);
    const spatial = entity.traits(Spatial);
    vec2.copy(spatial.position, position);
    vec2.set(spatial.velocity, (Math.random() * 2 - 1) * 2, (Math.random() * 2 - 1) * 2);
    const float = entity.traits(Float);
    float.z[0] = Math.random() * 0.5 + 0.5;
    return entity;
  }

  public item(): Item;
  public item(item: Item): this;
  public item(item?: Item) {
    const slot = this.traits(Inventory).slots[0];
    if (!item) {
      return slot.item;
    } else {
      slot.item = item;
      return this;
    }
  }

  init() {
    const spatial = this.traits(Spatial);
    vec2.set(spatial.scale, 2, 2);
    vec2.set(spatial.size, 0.25, 0.25);
    spatial.sprite.setTexture(this.item().texture, this.id);
    spatial.sprite.outline = true;
  }
}
Entity.types.set(ItemDrop.Type, ItemDrop);
