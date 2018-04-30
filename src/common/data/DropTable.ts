import { Item } from 'common/data';
import { RandomTemplate, RandomValue } from 'common/random';

export interface DropTable {
  readonly numDrops: RandomValue;
  readonly items: { prob: number, item: RandomTemplate<Item> }[];
}