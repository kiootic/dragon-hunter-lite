import { Game } from 'app/game';
import { BehaviorContext } from 'app/game/behavior';
import { Entity } from 'app/game/entities';

export interface ActionState {
  readonly type: string;
}

export interface Action<State extends ActionState> {
  readonly _state: State;
  readonly Type: string;

  begin?(this: BehaviorContext<State>): void;
  tick(this: BehaviorContext<State>, dt: number): void;
  end?(this: BehaviorContext<State>): void;
}