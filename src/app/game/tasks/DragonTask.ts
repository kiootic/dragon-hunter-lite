import { Game } from 'app/game';
import { SpawnEnemy } from 'app/game/messages';
import { Task } from 'app/game/tasks';
import { filter } from 'rxjs/operators/filter';

export class DragonTask extends Task {
  constructor(game: Game) {
    super(game);
    this.game.messages$.ofType(SpawnEnemy)
      .pipe(filter(msg => msg.enemyType === 'dragon'))
      .subscribe(this.spawn);
  }

  private spawn = ({ position }: SpawnEnemy) => {

  }
}