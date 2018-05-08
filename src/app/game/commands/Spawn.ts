import { Command } from 'app/game/commands';
import { Enemy, Entity } from 'app/game/entities';
import { Spatial } from 'app/game/traits';

export class Spawn extends Command {
  readonly name = 'spawn';

  exec(type: string) {
    let entity: Entity;
    switch (type) {
      case 'skeleton':
        entity = Enemy.make(this.game, 'Skeleton', this.game.player.traits.get(Spatial).position);
        break;
      default:
        this.log('unknown type: ' + type);
        return;
    }
    this.game.entities.add(entity);
  }
}
Command.register(new Spawn());