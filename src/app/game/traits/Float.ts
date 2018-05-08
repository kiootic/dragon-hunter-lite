import { Trait } from 'app/game/traits';
import { vec2 } from 'gl-matrix';
import { defaults } from 'lodash';

export interface Float extends Trait {
  readonly type: typeof Float.Type;
  readonly z: vec2;
  gravity: boolean;
}

export namespace Float {
  export declare const _mark: Float;
  export const Type = 'float';

  export function make(): Float {
    return {
      type: Float.Type,
      z: vec2.fromValues(0, 0),
      gravity: true
    };
  }

  export function serialize(trait: Float) {
    return {
      z: [trait.z[0], trait.z[1]],
      gravity: trait.gravity,
    };
  }

  export function deserialize(data: any, trait: Float): Float {
    return defaults({
      z: data.z && vec2.fromValues(data.z[0], data.z[1]),
      gravity: data.gravity === undefined ? true : data.gravity
    }, trait);
  }
}
Trait.types.set(Float.Type, Float);