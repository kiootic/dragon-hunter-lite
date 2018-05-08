import { Command } from 'app/game/commands';
import { ItemDrop } from 'app/game/entities';
import { Aspect } from 'common/data';
import { makeSolution } from 'common/logic/alchemy';
import { startCase } from 'lodash';

export class Potion extends Command {
  readonly name = 'potion';

  exec(...args: string[]) {
    const aspects: Aspect[] = [];
    for (let i = 0; i + 1 < args.length; i += 2) {
      const element = startCase(args[i]);
      const amount = Number(args[i + 1]) || 100;
      if (!this.game.library.elements[element]) {
        this.log('element not found: ' + element);
        continue;
      }
      aspects.push({ element, amount });
    }
    const drop = ItemDrop.make(this.game, makeSolution(aspects, this.game.library.elements));
    drop.age = 10000;
    this.game.entities.add(drop);
  }
}
Command.register(new Potion());