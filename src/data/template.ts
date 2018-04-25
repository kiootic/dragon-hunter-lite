import { ObjectDef } from 'data/objects';

export function makeFlower(rand: number, color: string): ObjectDef {
  const type = Math.floor(rand * 4) + 1;
  return {
    texture: {
      type: 'composite',
      overlay: { type: 'single', tex: `sprites/objects/flower-petal-${type}`, tint: color },
      base: { type: 'single', tex: `sprites/objects/flower-stem-${type}` }
    },
    color,
    jitter: true,
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
