import { Command } from 'app/game/commands';
import { ItemDrop } from 'app/game/entities';
import { instantiate } from 'common/random';
import { cloneDeep, startCase } from 'lodash';

export class Give extends Command {
  readonly name = 'give';

  exec(...items: string[]) {
    items = items.map(startCase);
    for (const obj of this.game.library.objects.filter(obj => obj && obj.drops)) {
      for (const { item: template } of obj.drops!.table.items) {
        const item = instantiate(template);
        const index = items.indexOf(item.name);
        if (index < 0)
          continue;

        items.splice(index, 1);
        const drop = ItemDrop.make(this.game, item);
        drop.age = 10000;
        this.game.entities.add(drop);
      }
    }
    for (const { output } of this.game.library.recipes) {
      const index = items.indexOf(output.name);
      if (index < 0)
        continue;

      items.splice(index, 1);
      const drop = ItemDrop.make(this.game, cloneDeep(output));
      drop.age = 10000;
      this.game.entities.add(drop);
    }
    if (items.length > 0)
      this.log('item not found: ' + items.join(', '));
  }
}
Command.register(new Give());