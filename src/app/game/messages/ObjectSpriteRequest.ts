import { TileObjectSprite } from 'app/game/interfaces';
import { Message } from 'app/game/messages';

export class ObjectSpriteRequest implements Message {
  public readonly type = 'object-sprite-request';

  public sprite?: TileObjectSprite;

  constructor(
    public readonly x: number,
    public readonly y: number,
  ) { }
}