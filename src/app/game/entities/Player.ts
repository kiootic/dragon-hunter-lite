import { Entity } from "app/game/Entity";
import { Game } from "app/game";
import { Spatial } from "app/game/traits";

export class Player extends Entity {
  public static readonly Type = 'player';
  public get type() { return Player.Type; }

  constructor(game: Game) {
    super(game);
    this.traits.make(Spatial);
  }
}
Entity.types.set(Player.Type, Player);
