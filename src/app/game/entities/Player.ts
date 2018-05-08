import { Entity } from 'app/game/entities';
import { Inventory, PlayerData, Spatial, Stats } from 'app/game/traits';
import { Item } from 'common/data';
import { Animations } from 'data/animations';
import { vec2 } from 'gl-matrix';

export class Player extends Entity {
  public static _mark: Player;
  public static readonly Type = 'player';
  public get type() { return Player.Type; }

  init() {
    const spatial = this.traits(Spatial);
    vec2.set(spatial.scale, 2, 2);
    vec2.set(spatial.size, 0.25, 0.25);

    const inventory = this.traits(Inventory, 43);
    inventory.slots[40].accepts = [Item.Type.Chestplate];
    inventory.slots[41].accepts = [Item.Type.Leggings];
    inventory.slots[42].accepts = [Item.Type.Boots];

    this.traits(Stats);
    this.traits(PlayerData);
  }

  hydrate() {
    this.traits.get(Spatial).sprite.setTexture(Animations.Player, this.id);
  }
}
Entity.types.set(Player.Type, Player);
