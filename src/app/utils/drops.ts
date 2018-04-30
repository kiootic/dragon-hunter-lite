import { DropTable } from 'common/data';
import { instantiate, randomValue } from 'common/random';

export function generateDrops(dropTable: DropTable) {
  const numDrops = Math.round(randomValue(dropTable.numDrops));
  const drops = [];
  for (let i = 0; i < numDrops; i++) {
    let x = Math.random();
    for (const { prob, item } of dropTable.items) {
      x -= prob;
      if (x <= 0) {
        drops.push(instantiate(item));
        break;
      }
    }
  }
  return drops;
}