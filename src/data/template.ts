import { Item } from 'common/data';
import { makeEffect } from 'common/logic/effect/common';
import { simpleDrops } from 'data/drops';
import { EffectDef } from 'data/effects';
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
    collidable: true,
    drops: {
      hp: 0,
      replaceWith: null,
      table: simpleDrops(1, 2, 1, {
        template: {
          id: `flower-${name.toLowerCase()}`,
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
          ],
          effects: [
            makeEffect(EffectDef.Type.Heal, 10, 0)
          ]
        },
        substs: [
          { path: 'aspects[0].amount', type: 'gaussian', mean: 15, sd: 2, min: 0, max: 20 },
          { path: 'aspects[1].amount', type: 'gaussian', mean: 8, sd: 2, min: 0, max: 12 },
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
    collidable: true,
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
    collidable: true,
    obstacle: true,
    drops: {
      hp: 1,
      replaceWith: depleted,
      table: simpleDrops(2, 4, 1, {
        template: {
          id: `berries-${name.toLowerCase()}`,
          name: `${name} Berries`,
          type: Item.Type.Consumable,
          texture: { type: 'single', tex: `sprites/items/berries-${type}`, tint: color },
          aspects: [
            { element: elements[0], amount: 0 },
            { element: elements[1], amount: 0 }
          ],
          effects: [
            makeEffect(EffectDef.Type.Heal, 10, 0)
          ]
        },
        substs: [
          { path: 'aspects[0].amount', type: 'gaussian', mean: 20, sd: 2, min: 0, max: 25 },
          { path: 'aspects[1].amount', type: 'gaussian', mean: 12, sd: 2, min: 0, max: 15 },
        ]
      })
    }
  };
}
