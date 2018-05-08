import { Command } from 'app/game/commands';
import { instantiate, randomValue, RandomValue } from 'common/random';
import { Elements } from 'data/elements';
import { padStart } from 'lodash';

export class Dump extends Command {
  readonly name = 'dump';

  exec(type: string = 'elements') {
    switch (type) {
      case 'elements': {
        const valueOf = (value: RandomValue) => padStart(randomValue(value).toFixed(2), 5, ' ');
        this.log('|   name   |    fission   |    fusion    | color |');
        for (const name of Object.keys(this.game.library.elements)) {
          const elem = this.game.library.elements[name];
          this.log(`\
 ${padStart(name, 10, ' ')}\
 (${valueOf(elem.fissionThreshold)}, ${valueOf(elem.fissionRate)})\
 (${valueOf(elem.fusionThreshold)}, ${valueOf(elem.fusionRate)})\
 ${padStart(elem.color, 6, '0')}`);
        }
      } break;
      case 'compo': {
        this.log('|tier|    name    |   element   |   element   |');
        for (const { tier, name, composition } of Elements) {
          this.log(`\
 ${padStart(tier.toString(), 4, ' ')}\
 ${padStart(name, 12, ' ')}\
 ${padStart(composition ? composition[0] : '', 13, ' ')}\
 ${padStart(composition ? composition[1] : '', 13, ' ')}`);
        }
      } break;
      case 'plants': {
        this.log('|       name       |   element   |   element   |');
        for (const obj of this.game.library.objects.filter(obj => obj && obj.drops)) {
          for (const { item: template } of obj.drops!.table.items) {
            const item = instantiate(template);
            if (!item.id.startsWith('flower-') && !item.id.startsWith('berries-'))
              continue;
            this.log(`\
 ${padStart(item.name, 18, ' ')}\
 ${padStart(item.aspects![0].element, 13, ' ')}\
 ${padStart(item.aspects![1].element, 13, ' ')}`);
          }
        }
      } break;
      default:
        this.log('unknown dump type: ' + type);
    }
  }
}
Command.register(new Dump());