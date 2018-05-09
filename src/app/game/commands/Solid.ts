import { Command } from 'app/game/commands';
import { Spatial } from 'app/game/traits';

export class Solid extends Command {
  readonly name = 'solid';

  exec(value: string) {
    const solid = value.toLowerCase() === 'true';
    this.game.player.traits.get(Spatial).solid = solid;
  }
}
Command.register(new Solid());