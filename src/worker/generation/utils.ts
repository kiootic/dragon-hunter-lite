import { distance, lch } from 'chroma-js';
import { randomValue, RandomValue } from 'common/random';
import { Elements } from 'data/elements';
import { times } from 'lodash';
import { RandomSeed } from 'random-seed';
import { ProgressReporter } from 'worker/generation/ProgressReporter';

export function* withProgress<T>(list: T[], report: ProgressReporter) {
  for (let i = 0; i < list.length; i++) {
    yield list[i];
    report(null, i / list.length);
  }
}

export function poissonDisk(width: number, height: number, radius: number, rand: RandomSeed) {
  // http://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph07-poissondisk.pdf

  const cellSize = radius * Math.SQRT1_2;
  const gridScale = (n: number) => n / cellSize;
  const grid = new Uint32Array(Math.ceil(gridScale(width)) * Math.ceil(gridScale(height)));
  const index = (x: number, y: number) => Math.floor(gridScale(x)) + Math.floor(gridScale(y)) * Math.ceil(gridScale(width));
  const active: [number, number][] = [];
  const samples: [number, number][] = [];
  const k = 64;

  const addSample = (x: number, y: number) => {
    x = Math.floor(x);
    y = Math.floor(y);
    if (x < 0 || y < 0 || x >= width || y >= height) return false;
    if (grid[index(x, y)]) return false;

    for (let dy = -1; dy <= 1; dy++)
      for (let dx = -1; dx <= 1; dx++) {
        const i = grid[index(x + dx * cellSize, y + dy * cellSize)];
        if (!i) continue;
        const px = (samples[i - 1][0] - x), py = (samples[i - 1][1] - y);
        if (px * px + py * py <= radius * radius) return false;
      }
    active.push([x, y]);
    grid[index(x, y)] = samples.push([x, y]);
    return true;
  };
  addSample(rand.range(width), rand.range(height));

  while (active.length > 0) {
    const i = rand.range(active.length);

    let j;
    for (j = 0; j < k; j++) {
      const theta = rand.floatBetween(0, Math.PI * 2);
      const r = rand.floatBetween(radius, radius * 2);
      if (addSample(active[i][0] + Math.cos(theta) * r, active[i][1] + Math.sin(theta) * r))
        break;
    }
    if (j === k)
      active.splice(i, 1);
  }

  return samples;
}

export function randomColors(
  rand: RandomSeed, n: number,
  chroma: RandomValue = { type: 'uniform', min: 0, max: 1 },
  lightness: RandomValue = { type: 'uniform', min: 0, max: 1 }
) {
  function randomColor() {
    const h = rand.random() * 360;
    const l = randomValue(lightness, rand.random) * 100;
    const c = randomValue(chroma, rand.random) * 100;
    return lch(l, c, h);
  }

  const candidates = times(n * 100, randomColor);
  const result = candidates.splice(rand.range(candidates.length), 1);
  for (let i = 1; i < n; i++) {
    let dist = 0;
    let color = result[0];

    for (const candidate of candidates) {
      let min = 1000;
      for (const color of result) {
        const d: number = distance(color, candidate) as any;
        min = Math.min(min, d);
        if (min < dist)
          break;
      }
      if (min > dist) {
        dist = min;
        color = candidate;
      }
    }
    result.push(color);
  }
  return result.map(color => color.rgb()).map(([r, g, b]) => (r * 0x10000 + g * 0x100 + b * 0x1));
}

export function randomElementPair(rand: RandomSeed): [string, string] {
  const elements = Elements.filter(elem => elem.tier <= 1);
  const elem1 = elements.splice(rand.range(elements.length), 1)[0];
  const elem2 = elements.splice(rand.range(elements.length), 1)[0];
  return [elem1.name, elem2.name];
}

export function rasterizeLine(x0: number, y0: number, x1: number, y1: number, cb: (x: number, y: number) => void) {
  x0 = Math.floor(x0); y0 = Math.floor(y0);
  x1 = Math.floor(x1); y1 = Math.floor(y1);

  const dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
  const sx = Math.sign(x1 - x0), sy = Math.sign(y1 - y0);
  let err = dx - dy;
  cb(x0, y0);
  while (x0 !== x1 || y0 !== y1) {
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    } else {
      err += dx;
      y0 += sy;
    }
    cb(x0, y0);
  }
}
