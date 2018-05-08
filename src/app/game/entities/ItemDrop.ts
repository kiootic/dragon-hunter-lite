import { Game } from 'app/game';
import { Entity } from 'app/game/entities';
import { Float, Inventory, Spatial } from 'app/game/traits';
import { Item } from 'common/data';
import { vec2 } from 'gl-matrix';

export class ItemDrop extends Entity {
  public static _mark: ItemDrop;
  public static readonly Type = 'item-drop';
  public get type() { return ItemDrop.Type; }

  public static make(game: Game, item: Item, position: vec2 = game.player.traits(Spatial).position) {
    const entity = new ItemDrop(game);
    const inventory = entity.traits.get(Inventory);
    inventory.slots[0].item = item;

    const spatial = entity.traits.get(Spatial);
    vec2.copy(spatial.position, position);
    vec2.random(spatial.velocity);

    const float = entity.traits.get(Float);
    float.z[0] = Math.random() * 0.5 + 0.5;
    return entity;
  }

  init() {
    const spatial = this.traits(Spatial, { solid: false });
    vec2.set(spatial.scale, 2, 2);
    vec2.set(spatial.size, 0.25, 0.25);

    this.traits(Float);
    this.traits(Inventory, 1);
  }

  hydrate() {
    const spatial = this.traits.get(Spatial);
    spatial.sprite.outline = true;
    spatial.sprite.setTexture(this.traits.get(Inventory).slots[0].item!.texture, this.id);
  }
}
Entity.types.set(ItemDrop.Type, ItemDrop);
