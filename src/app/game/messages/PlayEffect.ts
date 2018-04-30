import { TileObjectSprite } from 'app/game/interfaces';
import { Message } from 'app/game/messages';

export abstract class PlayEffect<Effect extends PlayEffect.Type, Target> implements Message {
  public readonly type = 'inventory-updated';

  constructor(
    public readonly effect: PlayEffect.Type,
    public readonly target: Target
  ) { }
}

export namespace PlayEffect {
  export enum Type {
    Shake = 'shake',
  }

  export class Shake extends PlayEffect<Type.Shake, TileObjectSprite | undefined>{ }
}