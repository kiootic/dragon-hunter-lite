import { Game } from 'app/game';
import { Entity } from 'app/game/Entity';
import { Spatial } from 'app/game/traits';
import { vec2 } from 'gl-matrix';

export class Player extends Entity {
  public static readonly Type = 'player';
  public get type() { return Player.Type; }

  constructor(game: Game) {
    super(game);
    const spatial = this.traits.make(Spatial);
    vec2.set(spatial.position, game.save.player.position[0], game.save.player.position[1]);
    vec2.set(spatial.scale, 2, 2);
    spatial.sprite.setTexture('sprites/placeholders/player', this.id);
  }
}
Entity.types.set(Player.Type, Player);
