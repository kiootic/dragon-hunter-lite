import { TileObject } from 'common/data';

export type ObjectDef = Pick<TileObject, Exclude<keyof TileObject, 'id' | 'name'>>;

export const makeObjects = (): Record<string, ObjectDef> => ({
  // trees
  'tree-coconut': {
    texture: 'sprites/objects/tree-coco',
    color: '4d6211',
    scale: 3,
    jitter: true,
    obstacle: true,
  },
  'tree-oak': {
    texture: 'sprites/objects/tree-oak',
    color: '01ac1d',
    scale: 3,
    jitter: true,
    obstacle: true,
    drops: {
      hp: 5,
      replaceWith: 0,
      table: []
    }
  },
  'tree-spruce': {
    texture: 'sprites/objects/tree-spruce',
    color: '004b01',
    scale: 3,
    jitter: true,
    obstacle: true,
  },

  // structures
  'bones': {
    texture: 'sprites/objects/bones',
    color: 'cccccc',
    jitter: true,
    terrain: true,
    obstacle: true,
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
  },
  'rocks': {
    texture: {
      type: 'random',
      texs: ['sprites/objects/rocks-1', 'sprites/objects/rocks-2', 'sprites/objects/rocks-3']
    },
    color: '505050',
    jitter: true,
    terrain: true,
  },
});