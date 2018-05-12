import { Message } from 'app/game/messages';

export class Death implements Message {
  public readonly type = 'death';

  constructor(
    public readonly entityId: number
  ) { }
}