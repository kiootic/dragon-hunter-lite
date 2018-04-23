import { Terrain } from 'common/data';

export type TerrainDef = Pick<Terrain, Exclude<keyof Terrain, 'id' | 'name'>>;

export const terrains: Record<string, TerrainDef> = {
  'water': {
    texture: 'sprites/terrains/water',
    color: '235c7c',
  },
  'lava': {
    texture: 'sprites/terrains/lava',
    color: '8b1408',
  },
  'mud': {
    texture: 'sprites/terrains/mud',
    color: '6d584b',
  },

  'grass': {
    texture: {
      type: 'random',
      texs: ['sprites/terrains/grass-1', 'sprites/terrains/grass-2', 'sprites/terrains/grass-3'],
      tint: '00ff00'
    },
    color: '51a01e',
  },
  'grass-deep': {
    texture: {
      type: 'random',
      texs: ['sprites/terrains/grass-1', 'sprites/terrains/grass-2', 'sprites/terrains/grass-3'],
      tint: '00cc00'
    },
    color: '316112',
  },
  'grass-light': {
    texture: {
      type: 'random',
      texs: ['sprites/terrains/grass-1', 'sprites/terrains/grass-2', 'sprites/terrains/grass-3'],
      tint: 'aaffaa'
    },
    color: '487f61',
  },

  'soil': {
    texture: {
      type: 'random',
      texs: ['sprites/terrains/soil-1', 'sprites/terrains/soil-2', 'sprites/terrains/soil-3'],
    },
    color: '846b5c',
  },
  'stone': {
    texture: {
      type: 'random',
      texs: ['sprites/terrains/stone-1', 'sprites/terrains/stone-2', 'sprites/terrains/stone-3'],
      tint: '404040'
    },
    color: '514845',
  },
  'sand': {
    texture: {
      type: 'random',
      texs: ['sprites/terrains/sand-1', 'sprites/terrains/sand-2', 'sprites/terrains/sand-3'],
    },
    color: 'e2bf90',
  },
  'ice': {
    texture: 'sprites/terrains/ice',
    color: 'aad0e7',
  },
  'snow': {
    texture: 'sprites/terrains/snow',
    color: 'e0e9ee',
  },
};