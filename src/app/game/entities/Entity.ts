import { Game } from 'app/game';
import { Trait, TraitType } from 'app/game/traits';

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
    this._game.entities.delete(this);
    this._game = null;
  }

  private _traits = new Map<string, Trait>();
  public traits = Object.assign(<T extends Trait, Arg>(trait: TraitType<T, Arg>, arg?: Arg) => {
    let t: T = this._traits.get(trait.Type) as T;
    if (!t) {
      t = trait.make(arg);
      this._traits.set(t.type, t);
    }
    return t;
  }, {
      get: <T extends Trait>(trait: TraitType<T>) => {
        return this._traits.get(trait.Type) as T;
      },
      set: <T extends Trait>(trait: T) => {
        this._traits.set(trait.type, trait);
      },
      list: () => this._traits.values()
    });
}

export interface EntityType<T extends Entity = Entity> {
  new(game: Game, id?: number): T;
  readonly _mark: T;
  readonly Type: string;
}
