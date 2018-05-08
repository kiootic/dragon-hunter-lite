import { TileObjectSprite } from 'app/game/interfaces';
import { Message } from 'app/game/messages';

export abstract class PlayFX<Effect extends PlayFX.Type, Target> implements Message {
  public readonly type = 'play-fx';

  constructor(
    public readonly effect: PlayFX.Type,
    public readonly target: Target
  ) { }
}

export namespace PlayFX {
  export enum Type {
    Shake = 'shake',
  }

  export class Shake extends PlayFX<Type.Shake, TileObjectSprite | undefined>{ }
}