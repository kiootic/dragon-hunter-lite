import { Message } from 'app/game/messages';

export class InteractObject implements Message {
  public readonly type = 'interact-object';

  constructor(
    public readonly tileX: number,
    public readonly tileY: number
  ) { }
}