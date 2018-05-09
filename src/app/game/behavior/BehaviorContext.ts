import { Game } from 'app/game';
import { Entity } from 'app/game/entities';

export interface BehaviorContext<State> {
  readonly game: Game;
  readonly self: Entity;
  readonly state: State;
}