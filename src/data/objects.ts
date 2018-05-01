import { Item, TileObject } from 'common/data';
import { simpleDrops } from 'data/drops';

export type ObjectDef = Pick<TileObject, Exclude<keyof TileObject, 'id' | 'name'>>;

export const makeObjects = (): Record<string, ObjectDef> => ({
  // trees
  'tree-coconut': {
    texture: 'sprites/objects/tree-coco',
    color: '4d6211',
    scale: 3,
    jitter: true,
    obstacle: true,
    interactive: true,
    drops: {
      hp: 5,
      replaceWith: 0,
      table: simpleDrops(1, 2, 1, {
        template: {
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
    obstacle: true,
    interactive: true,
    drops: {
      hp: 5,
      replaceWith: 0,
      table: simpleDrops(1, 2, 1, {
        template: {
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
    obstacle: true,
    interactive: true,
    drops: {
      hp: 5,
      replaceWith: 0,
      table: simpleDrops(1, 2, 1, {
        template: {
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
    obstacle: true,
    interactive: true,
    drops: {
      hp: 3,
      replaceWith: 0,
      table: simpleDrops(0, 1, 0.5, {
        template: {
          name: 'Bone',
          type: Item.Type.Material,
          texture: 'sprites/items/bone'
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
    obstacle: true,
  },
  'pillar': {
    texture: {
      type: 'random',
      texs: ['sprites/objects/pillar-1', 'sprites/objects/pillar-2', 'sprites/objects/pillar-3']
    },
    color: '606060',
    scale: 2,
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
    interactive: true,
    drops: {
      hp: 0,
      replaceWith: 0,
      table: {
        numDrops: { type: 'constant', value: 0 },
        items: []
      }
    }
  },
  'cactus': {
    texture: 'sprites/objects/cactus',
    color: '416652',
    scale: 1.5,
    jitter: true,
    obstacle: true,
  },
  'bush': {
    texture: 'sprites/objects/bush',
    color: '416652',
    scale: 1.5,
    jitter: true,
    obstacle: true,
  },
  'stone': {
    texture: 'sprites/objects/stone',
    color: '505050',
    jitter: true,
    obstacle: true,
    interactive: true,
    drops: {
      hp: 8,
      replaceWith: 0,
      table: simpleDrops(2, 4, 0.5, {
        template: {
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
    interactive: true,
    drops: {
      hp: 2,
      replaceWith: 0,
      table: simpleDrops(1, 2, 1, {
        template: {
          name: 'Stone',
          type: Item.Type.Material,
          texture: 'sprites/items/stone'
        },
        substs: []
      })
    }
  },
});