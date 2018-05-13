import { Enemies } from 'app/game/behavior/enemies';
import { Command } from 'app/game/commands';
import { Enemy } from 'app/game/entities';
import { Spatial } from 'app/game/traits';

export class Spawn extends Command {
  readonly name = 'spawn';

  exec(type: string) {
    const enemyDef = Enemies[type.toLowerCase()];
    if (!enemyDef)
      this.log('unknown type: ' + type);

    const entity = Enemy.make(this.game, enemyDef, this.game.player.traits.get(Spatial).position);
    this.game.entities.add(entity);
  }
}
Command.register(new Spawn());