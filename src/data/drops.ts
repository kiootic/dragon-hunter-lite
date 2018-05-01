import { DropTable, Item } from 'common/data';
import { RandomTemplate } from 'common/random';

export function simpleDrops(min: number, max: number, rate: number, template: RandomTemplate<Item>): DropTable {
  return {
    numDrops: { type: 'exponential', min, max, rate },
    items: [{ prob: 1, item: template }]
  };
}