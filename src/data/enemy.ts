import { EnemyDef } from 'common/data';
import { EntityProps } from 'common/data/props';
import { cloneDeep } from 'lodash';

export function makeEnemy(id: number, enemyDef: EnemyDef, position: [number, number]): EntityProps {
  return cloneDeep({
    id,
    type: 'enemy',
    age: 0,
    traits: {
      'spatial': {
        pos: position
      },
      'enemy-data': {
        def: enemyDef
      },
      'behavior': {
        behaviors: enemyDef.behaviors
      },
      'stats': {
        base: enemyDef.stats
      }
    }
  });
}