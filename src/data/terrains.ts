import { Terrain } from 'common/data';

export type TerrainDef = Pick<Terrain, Exclude<keyof Terrain, 'id' | 'name'>>;

export const makeTerrains = (): Record<string, TerrainDef> => ({
  'water': {
    texture: { type: 'liquid', tex: 'sprites/terrains/water', offset: 16, time: 5000 },
    color: '235c7c',
    liquid: true,
  },
  'lava': {
    texture: { type: 'liquid', tex: 'sprites/terrains/lava', offset: 16, time: 15000 },
    color: '8b1408',
    liquid: true,
  },
  'mud': {
    texture: { type: 'liquid', tex: 'sprites/terrains/mud', offset: 8, time: 5000 },
    color: '6d584b',
    liquid: true,
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
});