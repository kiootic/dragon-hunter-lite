import { Entity } from 'app/game/Entity';
import { Spatial } from 'app/game/traits';
import { Animations } from 'data/animations';
import { vec2 } from 'gl-matrix';

export class Player extends Entity {
  public static _mark: Player;
  public static readonly Type = 'player';
  public get type() { return Player.Type; }

  init() {
    const spatial = this.traits.make(Spatial);
    vec2.set(spatial.scale, 2, 2);
    vec2.set(spatial.size, 0.25, 0.25);
    spatial.sprite.setTexture(Animations.Player, this.id);
  }
}
Entity.types.set(Player.Type, Player);
