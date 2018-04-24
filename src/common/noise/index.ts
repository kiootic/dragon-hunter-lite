import { RandomSeed } from 'random-seed';
import OpenSimplexNoise from './simplex';

export class Noise {
  private readonly noise: OpenSimplexNoise;
  constructor(
    rand: RandomSeed,
    private readonly freq = 1 / 256,
    private readonly octaves = 4,
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
