import { Game } from 'app/game';
import { Task } from 'app/game/tasks';

export class InventoryTask extends Task {
  constructor(game: Game) {
    super(game);
  }

  update(dt: number) {
  }
}