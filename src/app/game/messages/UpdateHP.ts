import { Message } from 'app/game/messages';

export class UpdateHP implements Message {
  public readonly type = 'update-hp';

  constructor(
    public readonly entityId: number,
    public readonly hpDiff: number
  ) { }
}