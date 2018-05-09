import { Message } from 'app/game/messages';

export class EntityCollision implements Message {
  public readonly type = 'entity-collision';

  constructor(
    public readonly entityIdA: number,
    public readonly entityIdB: number,
  ) { }
}