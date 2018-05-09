import { Game } from 'app/game';
import { BehaviorTree } from 'app/game/behavior';
import { Task } from 'app/game/tasks';
import { Behavior } from 'app/game/traits';

export class BehaviorTask extends Task {
  constructor(game: Game) {
    super(game);
  }

  update(dt: number) {

    for (const entity of this.game.entities.withTrait(Behavior)) {
      const { behaviors } = entity.traits.get(Behavior);
      BehaviorTree.run(entity, dt, behaviors);
    }
  }
}