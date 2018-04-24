import { Game } from "app/game";

export abstract class Entity {
  public readonly game: Game;
  public readonly id: number;
  public abstract get type(): string;

  constructor(game: Game) {
    this.game = game;
    this.id = game.save.props.nextEntityId++;
    game.entities.set(this.id, this);
  }

  public delete() {
    this.game.entities.delete(this.id);
  }
}