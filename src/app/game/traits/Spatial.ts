import { Trait } from "app/game";
import { vec2 } from "gl-matrix";

export interface Spatial extends Trait {
  readonly type: typeof Spatial.Type;
  readonly position: vec2;
}

export namespace Spatial {
  export declare const _mark: Spatial;
  export const Type = 'spatial';

  export function make(): Spatial {
    return {
      type: Spatial.Type,
      position: vec2.fromValues(0, 0)
    };
  }
}