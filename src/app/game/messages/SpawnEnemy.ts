import { Message } from 'app/game/messages';
import { vec2 } from 'gl-matrix';

export class SpawnEnemy implements Message {
  public readonly type = 'spawn-enemy';

  constructor(
    public readonly enemyType: string,
    public readonly position: vec2
  ) { }
}