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
      replaceWith: null,
      table: simpleDrops(1, 2, 1, {
        template: {
          id: `flower-${name}`,
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

export const NumBerryTypes = 4;
export function makeBerryBush(name: string, depleted: string, type: number, color: string): ObjectDef {
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
    interactive: true,
    drops: {
      hp: 1,
      replaceWith: depleted,
      table: simpleDrops(2, 4, 1, {
        template: {
          id: `berries-${name}`,
          name: `${name} Berries`,
          type: Item.Type.Material,
          texture: { type: 'single', tex: `sprites/items/berries-${type}`, tint: color }
        },
        substs: []
      })
    }
  };
}
