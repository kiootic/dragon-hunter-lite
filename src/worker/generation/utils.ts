import { randomValue, RandomValue } from 'common/random';
import { Elements } from 'data/elements';
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

export function hsl2rgb(h: number, s: number, l: number) {
  // https://www.w3.org/TR/css-color-3/#hsl-color
  const m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
  const m1 = l * 2 - m2;

  function hue2rgb(m1: number, m2: number, h: number) {
    if (h < 0) h++;
    else if (h > 1) h--;

    if (h * 6 < 1) return m1 + (m2 - m1) * h * 6;
    else if (h * 2 < 1) return m2;
    else if (h * 3 < 2) return m1 + (m2 - m1) * (2 / 3 - h) * 6;
    else return m1;
  }

  const r = hue2rgb(m1, m2, h + 1 / 3);
  const g = hue2rgb(m1, m2, h);
  const b = hue2rgb(m1, m2, h - 1 / 3);
  return [r, g, b];
}

export function randomColors(
  rand: RandomSeed, n: number,
  saturation: RandomValue = { type: 'constant', value: 1 },
  lightness: RandomValue = { type: 'constant', value: 0.5 }
) {
  const interval = 1 / n;
  const begin = rand.random() / n;

  const result = [];
  for (let i = 0; i < n; i++) {
    const h = (begin + interval * i) % 1;
    const [r, g, b] = hsl2rgb(
      h, randomValue(saturation, rand.random), randomValue(lightness, rand.random)
    ).map(value => Math.floor(value * 255));
    result.push(r * 0x10000 + g * 0x100 + b * 0x1);
  }
  return result;
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
