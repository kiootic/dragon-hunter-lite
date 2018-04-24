import { Game } from 'app/game';
import { Trait } from 'app/game/Trait';

export abstract class Entity {
  public readonly game: Game;
  public readonly id: number;
  public abstract get type(): string;

  public static types = new Map<string, typeof Entity>();

  constructor(game: Game) {
    this.game = game;
    this.id = game.save.props.nextEntityId++;
    game.entities.set(this.id, this);
  }

  public delete() {
    this.game.entities.delete(this.id);
  }

  private _traits = new Map<string, Trait>();
  public traits = {
    get: <T extends Trait>(trait: { _mark: T, Type: string }) => {
      return this._traits.get(trait.Type) as T;
    },
    make: <T extends Trait>(trait: { _mark: T, make(): T }) => {
      const t = trait.make();
      this._traits.set(t.type, t);
    }
  };
}