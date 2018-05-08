import { Game } from 'app/game';

export interface CommandContext {
  log(text: string): void;
  readonly game: Game;
}