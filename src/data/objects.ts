import { Item, TileObject } from 'common/data';
import { makeEffect } from 'common/logic/effect/common';
import { simpleDrops } from 'data/drops';
import { EffectDef } from 'data/effects';
import { ElementDef } from 'data/elements';

export type ObjectDef = Pick<TileObject, Exclude<keyof TileObject, 'id' | 'name'>>;

export const makeObjects = (): Record<string, ObjectDef> => ({
  // trees
  'tree-coconut': {
    texture: 'sprites/objects/tree-coco',
    color: '4d6211',
    scale: 3,
    jitter: true,
    collidable: true,
    obstacle: true,
    drops: {
      hp: 5,
      replaceWith: null,
      table: simpleDrops(2, 4, 0.5, {
        template: {
          id: 'wood-palm',
          name: 'Palm Wood',
          type: Item.Type.Material,
          texture: 'sprites/items/wood'
        },
        substs: []
      })
    }
  },
  'tree-oak': {
    texture: 'sprites/objects/tree-oak',
    color: '01ac1d',
    scale: 3,
    jitter: true,
    collidable: true,
    obstacle: true,
    drops: {
      hp: 5,
      replaceWith: null,
      table: simpleDrops(2, 4, 0.5, {
        template: {
          id: 'wood-oak',
          name: 'Oak Wood',
          type: Item.Type.Material,
          texture: {
            type: 'single',
            tex: 'sprites/items/wood',
            tint: 'a0a0a0'
          }
        },
        substs: []
      })
    }
  },
  'tree-spruce': {
    texture: 'sprites/objects/tree-spruce',
    color: '004b01',
    scale: 3,
    jitter: true,
    collidable: true,
    obstacle: true,
    drops: {
      hp: 5,
      replaceWith: null,
      table: simpleDrops(2, 4, 0.5, {
        template: {
          id: 'wood-spruce',
          name: 'Spruce Wood',
          type: Item.Type.Material,
          texture: {
            type: 'single',
            tex: 'sprites/items/wood',
            tint: '808080'
          }
        },
        substs: []
      })
    }
  },

  // structures
  'bones': {
    texture: 'sprites/objects/bones',
    color: 'cccccc',
    jitter: true,
    terrain: true,
    collidable: true,
    obstacle: true,
    drops: {
      hp: 3,
      replaceWith: null,
      table: simpleDrops(2, 5, 0.7, {
        template: {
          id: 'bone',
          name: 'Bone',
          type: Item.Type.Material,
          texture: { type: 'single', tex: 'sprites/items/bone', tint: 'ccb396' },
          material: {
            name: 'Bone',
            color: 'ccb396',
            weight: 0.1,
            toughness: 0.1,
            sharpness: 0.15,
            affinity: 0.15,
          },
        },
        substs: []
      })
    }
  },
  'cross': {
    texture: 'sprites/objects/cross',
    color: 'cccccc',
    scale: 2,
    jitter: true,
    collidable: true,
    obstacle: true,
  },
  'pillar': {
    texture: {
      type: 'random',
      texs: ['sprites/objects/pillar-1', 'sprites/objects/pillar-2', 'sprites/objects/pillar-3']
    },
    color: '606060',
    scale: 2,
    collidable: true,
    obstacle: true,
  },

  // vegetation & decorations
  'fern': {
    texture: {
      type: 'random',
      texs: ['sprites/objects/fern-1', 'sprites/objects/fern-2', 'sprites/objects/fern-3']
    },
    color: '416652',
    jitter: true,
    collidable: true,
    drops: {
      hp: 0,
      replaceWith: null,
      table: simpleDrops(0, 1, 4, {
        template: {
          id: 'leaf',
          name: 'Leaf',
          type: Item.Type.Consumable,
          texture: 'sprites/items/leaf',
          material: {
            name: 'Leaf',
            color: '00d000',
            weight: 0.05,
            toughness: 0.05,
            sharpness: 0.05,
            affinity: 0.1,
          },
          aspects: [
            { element: ElementDef.Type.Life, amount: 50 }
          ],
          effects: [
            makeEffect(EffectDef.Type.Heal, 5, 0)
          ],
        },
        substs: []
      })
    }
  },
  'cactus': {
    texture: 'sprites/objects/cactus',
    color: '416652',
    scale: 1.5,
    jitter: true,
    collidable: true,
    obstacle: true,
  },
  'bush': {
    texture: 'sprites/objects/bush',
    color: '416652',
    scale: 1.5,
    jitter: true,
    collidable: true,
    obstacle: true,
  },
  'stone': {
    texture: 'sprites/objects/stone',
    color: '505050',
    jitter: true,
    collidable: true,
    obstacle: true,
    drops: {
      hp: 8,
      replaceWith: null,
      table: simpleDrops(2, 5, 0.5, {
        template: {
          id: 'stone',
          name: 'Stone',
          type: Item.Type.Material,
          texture: 'sprites/items/stone'
        },
        substs: []
      })
    }
  },
  'rocks': {
    texture: {
      type: 'random',
      texs: ['sprites/objects/rocks-1', 'sprites/objects/rocks-2', 'sprites/objects/rocks-3']
    },
    color: '505050',
    jitter: true,
    terrain: true,
    collidable: true,
    drops: {
      hp: 1,
      replaceWith: null,
      table: simpleDrops(1, 3, 1, {
        template: {
          id: 'stone',
          name: 'Stone',
          type: Item.Type.Material,
          texture: 'sprites/items/stone'
        },
        substs: []
      })
    }
  },
});