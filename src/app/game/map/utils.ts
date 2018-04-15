import { RandomSeed } from 'random-seed';
import OpenSimplexNoise from 'open-simplex-noise';

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

export class Noise {
  private readonly noise: OpenSimplexNoise;
  constructor(
    rand: RandomSeed,
    private readonly freq = 1 / 512,
    private readonly octaves = 2,
    private readonly persistence = 0.5
  ) {
    this.noise = new OpenSimplexNoise(rand.random() * 0xffffffff);
  }

  public noise2D(x: number, y: number) {
    let amp = 1, maxAmp = 0;
    let freq = this.freq;
    let noise = 0;
    for (let i = 0; i < this.octaves; i++) {
      noise += this.noise.noise2D(x * freq, y * freq) * amp;
      maxAmp += amp;
      amp *= this.persistence;
      freq *= 2;
    }
    noise /= maxAmp;
    return (noise + 1) / 2;
  }
}
