import { Message } from 'app/game/messages';
import { Effect, Weapon } from 'common/data';
import { vec2 } from 'gl-matrix';

export class Attack implements Message {
  public readonly type = 'attack';

  constructor(
    public readonly entityId: number,
    public readonly weapon: Weapon,
    public readonly targetPosition: vec2,
    public readonly effects: Effect[],
    public readonly duration?: number,
  ) { }
}