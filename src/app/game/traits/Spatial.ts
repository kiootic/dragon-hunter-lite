import { Trait } from 'app/game';
import { TextureSprite } from 'app/game/map';
import { vec2 } from 'gl-matrix';

export interface Spatial extends Trait {
  readonly type: typeof Spatial.Type;
  readonly position: vec2;
  readonly velocity: vec2;
  readonly scale: vec2;
  readonly sprite: TextureSprite;
}

export namespace Spatial {
  export declare const _mark: Spatial;
  export const Type = 'spatial';

  export function make(): Spatial {
    return {
      type: Spatial.Type,
      position: vec2.fromValues(0, 0),
      velocity: vec2.fromValues(0, 0),
      scale: vec2.fromValues(1, 1),
      sprite: new TextureSprite()
    };
  }
}