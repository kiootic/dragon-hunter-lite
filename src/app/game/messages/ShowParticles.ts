import { Message } from 'app/game/messages';
import { vec2 } from 'gl-matrix';

export class ShowParticles implements Message {
  public readonly type = 'show-particles';

  constructor(
    public readonly coords: vec2,
    public readonly numParticles: number,
    public readonly color: number,
    public readonly z = 0
  ) { }
}