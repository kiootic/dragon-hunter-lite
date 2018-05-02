import { Item } from 'common/data';
import { simpleDrops } from 'data/drops';
import { ObjectDef } from 'data/objects';

export const NumFlowerTypes = 4;
export function makeFlower(name: string, type: number, color: string, elements: [string, string]): ObjectDef {
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
          type: Item.Type.Consumable,
          texture: {
            type: 'composite',
            overlay: { type: 'single', tex: `sprites/items/flower-petal-${type}`, tint: color },
            base: { type: 'single', tex: `sprites/items/flower-stem-${type}` }
          },
          aspects: [
            { element: elements[0], amount: 0 },
            { element: elements[1], amount: 0 }
          ]
        },
        substs: [
          { path: 'aspects[0].amount', type: 'gaussian', mean: 5, sd: 2, min: 0, max: 10 },
          { path: 'aspects[1].amount', type: 'gaussian', mean: 2, sd: 2, min: 0, max: 5 },
        ]
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
export function makeBerryBush(name: string, depleted: string, type: number, color: string, elements: [string, string]): ObjectDef {
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
          type: Item.Type.Consumable,
          texture: { type: 'single', tex: `sprites/items/berries-${type}`, tint: color },
          aspects: [
            { element: elements[0], amount: 0 },
            { element: elements[1], amount: 0 }
          ]
        },
        substs: [
          { path: 'aspects[0].amount', type: 'gaussian', mean: 8, sd: 2, min: 0, max: 12 },
          { path: 'aspects[1].amount', type: 'gaussian', mean: 4, sd: 2, min: 0, max: 8 },
        ]
      })
    }
  };
}
