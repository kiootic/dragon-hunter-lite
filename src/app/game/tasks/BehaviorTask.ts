import { Game } from 'app/game';
import { BehaviorTree } from 'app/game/behavior';
import { Enemies } from 'app/game/behavior/enemies';
import { Enemy } from 'app/game/entities';
import { SpawnEnemy } from 'app/game/messages';
import { Task } from 'app/game/tasks';
import { Behavior } from 'app/game/traits';
import { filter } from 'rxjs/operators/filter';

export class BehaviorTask extends Task {
  constructor(game: Game) {
    super(game);
    this.game.messages$.ofType(SpawnEnemy)
      .pipe(filter(msg => msg.enemyType !== 'dragon'))
      .subscribe(this.spawn);
  }

  private spawn = ({ enemyType, position }: SpawnEnemy) => {
    const enemyDef = Enemies[enemyType];
    const entity = Enemy.make(this.game, enemyDef, position);
    this.game.entities.add(entity);
  }

  update(dt: number) {
    for (const entity of this.game.entities.withTrait(Behavior)) {
      const { behaviors } = entity.traits.get(Behavior);
      BehaviorTree.run(entity, dt, behaviors);
    }
  }
}