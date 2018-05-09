import { BehaviorContext } from 'app/game/behavior';

export enum ActionKind {
  Movement = 'movement'
}

export interface ActionState {
  readonly type: string;
}

export interface Action<State extends ActionState> {
  readonly _state: State;
  readonly Type: string;
  readonly Kind: ActionKind;

  begin?(this: BehaviorContext<State>): void;
  tick(this: BehaviorContext<State>, dt: number): void;
  end?(this: BehaviorContext<State>): void;
}