import { Item } from 'common/data';
import { simpleDrops } from 'data/drops';
import { ObjectDef } from 'data/objects';

export const NumFlowerTypes = 4;
export function makeFlower(name: string, type: number, color: string): ObjectDef {
  return {
    texture: {
      type: 'composite',
      overlay: { type: 'single', tex: `sprites/objects/flower-petal-${type}`, tint: color },
      base: { type: 'single', tex: `sprites/objects/flower-stem-${type}` }
    },
    color,
    jitter: true,
    interactive: true,
    drops: {
      hp: 0,
      replaceWith: 0,
      table: simpleDrops(1, 2, 1, {
        template: {
          name,
          type: Item.Type.Material,
          texture: {
            type: 'composite',
            overlay: { type: 'single', tex: `sprites/items/flower-petal-${type}`, tint: color },
            base: { type: 'single', tex: `sprites/items/flower-stem-${type}` }
          }
        },
        substs: []
      })
    }
  };
}

export function makeBush(): ObjectDef {
  return {
    texture: 'sprites/objects/bush',
    color: '416652',
    scale: 1.5,
    jitter: true,
    obstacle: true,
  };
}

export function makeBerryBush(color: string): ObjectDef {
  return {
    texture: {
      type: 'composite',
      overlay: { type: 'single', tex: 'sprites/objects/berrybush-berries', tint: color },
      base: { type: 'single', tex: 'sprites/objects/berrybush-bush' }
    },
    color: '416652',
    scale: 1.5,
    jitter: true,
    obstacle: true,
  };
}
