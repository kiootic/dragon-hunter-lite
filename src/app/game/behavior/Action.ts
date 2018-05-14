import { BehaviorContext } from 'app/game/behavior';

export enum ActionKind {
  Movement = 'movement',
  Attack = 'attack',
  Effect = 'effect',
}

export interface ActionState {
  readonly type: string;
}

export interface Action<State extends ActionState> {
  readonly _state: State;
  readonly Type: string;
  readonly Kind: ActionKind;

  mutate(state: State): State;
  dump(state: State): string;

  begin?(this: BehaviorContext<State>): void;
  tick(this: BehaviorContext<State>, dt: number): boolean;
  end?(this: BehaviorContext<State>): void;
}