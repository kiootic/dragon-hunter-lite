import { Game } from 'app/game';
import { BehaviorContext } from 'app/game/behavior';
import { Entity } from 'app/game/entities';

export interface ConditionState {
  readonly type: string;
}

export interface Condition<State extends ConditionState> {
  readonly _state: State;
  readonly Type: string;

  isFulfilled(this: BehaviorContext<State>): boolean;
  mutate(state: State): State;
}