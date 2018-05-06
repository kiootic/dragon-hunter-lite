import { Message } from 'app/game/messages';
import { Effect } from 'common/data';

export class ApplyEffects implements Message {
  public readonly type = 'inventory-swap';

  constructor(
    public readonly entityId: number,
    public readonly effects: Effect[]
  ) { }
}