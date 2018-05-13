import { Enemies } from 'app/game/behavior/enemies';
import { Command } from 'app/game/commands';
import { SpawnEnemy } from 'app/game/messages';
import { Spatial } from 'app/game/traits';

export class Spawn extends Command {
  readonly name = 'spawn';

  exec(type: string) {
    const enemyDef = Enemies[type.toLowerCase()];
    if (!enemyDef) {
      this.log('unknown type: ' + type);
      return;
    }

    this.game.dispatch(new SpawnEnemy(
      type.toLowerCase(),
      this.game.player.traits.get(Spatial).position
    ));
  }
}
Command.register(new Spawn());