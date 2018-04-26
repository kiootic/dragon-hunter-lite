import { Game } from 'app/game';
import { Trait, TraitType } from 'app/game/Trait';

export abstract class Entity {
  private _game: Game | null;
  public get game() { return this._game; }

  public readonly id: number;
  public abstract get type(): string;

  public static types = new Map<string, EntityType>();

  constructor(game: Game, id?: number) {
    this._game = game;
    this.id = id || (game.data.props.nextEntityId++);
  }

  public init() {
  }

  public delete() {
    if (!this._game) return;
    this._game.entities.delete(this.id);
    this._game = null;
  }

  private _traits = new Map<string, Trait>();
  public traits = {
    get: <T extends Trait>(trait: TraitType<T>) => {
      return this._traits.get(trait.Type) as T;
    },
    set: <T extends Trait>(trait: T) => {
      this._traits.set(trait.type, trait);
    },
    list: () => this._traits.values(),
    make: <T extends Trait>(trait: TraitType<T>) => {
      let t: T = this._traits.get(trait.Type) as T;
      if (!t) {
        t = trait.make();
        this._traits.set(t.type, t);
      }
      return t;
    }
  };
}

export interface EntityType<T extends Entity = Entity> {
  new(game: Game, id?: number): T;
  readonly _mark: T;
  readonly Type: string;
}
