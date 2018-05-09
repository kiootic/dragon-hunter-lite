import { Chase } from 'app/game/behavior/actions';
import { HP } from 'app/game/behavior/conditions';
import { Command } from 'app/game/commands';
import { Enemy, Entity } from 'app/game/entities';
import { Behavior, Spatial, Stats } from 'app/game/traits';

export class Spawn extends Command {
  readonly name = 'spawn';

  exec(type: string) {
    let entity: Entity;
    switch (type) {
      case 'skeleton':
        entity = Enemy.make(this.game, 'Skeleton', this.game.player.traits.get(Spatial).position);
        entity.traits.set(Behavior.make({
          conditions: [
            Object.assign(HP.greaterThan(0.5), {
              _actions: [
                Object.assign(Chase.make(), { _active: false })
              ]
            })
          ]
        }));
        entity.traits.get(Stats).base.spd = 5;
        break;
      default:
        this.log('unknown type: ' + type);
        return;
    }
    this.game.entities.add(entity);
  }
}
Command.register(new Spawn());