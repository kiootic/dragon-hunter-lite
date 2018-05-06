import { Message } from 'app/game/messages';
import { vec2 } from 'gl-matrix';

export class ShowParticles implements Message {
  public readonly type = 'show-particles';

  constructor(
    public readonly particleType: ShowParticles.Type,
    public readonly coords: vec2,
    public readonly numParticles: number,
    public readonly color: number,
    public readonly z = 0
  ) { }
}

export namespace ShowParticles {
  export enum Type {
    Splash = 'splash',
    Float = 'float'
  }

  export function splash(coords: vec2, numParticles: number, color: number, z = 0) {
    return new ShowParticles(Type.Splash, coords, numParticles, color, z);
  }
  export function float(coords: vec2, numParticles: number, color: number, z = 0) {
    return new ShowParticles(Type.Float, coords, numParticles, color, z);
  }
}