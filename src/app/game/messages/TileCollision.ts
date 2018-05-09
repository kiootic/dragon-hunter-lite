import { Message } from 'app/game/messages';

export class TileCollision implements Message {
  public readonly type = 'tile-collision';

  constructor(
    public readonly entityId: number,
    public readonly x: number,
    public readonly y: number
  ) { }
}