import { Trait } from 'app/game/traits';
import { vec2 } from 'gl-matrix';
import { defaults } from 'lodash';

export interface Collidable extends Trait {
  readonly size: vec2;
  mass: number;
}

export namespace Collidable {
  export declare const _mark: Collidable;
  export const Type = 'collidable';

  export function make(): Collidable {
    return {
      type: Collidable.Type,
      mass: 1,
      size: vec2.fromValues(0.5, 0.5)
    };
  }

  export function serialize(trait: Collidable) {
    return {
      size: [trait.size[0], trait.size[1]],
      mass: trait.mass,
    };
  }

  export function deserialize(data: any, trait: Collidable): Collidable {
    return defaults({
      size: data.size && vec2.fromValues(data.size[0], data.size[1]),
      mass: trait.mass,
    }, trait);
  }
}
Trait.types.set(Collidable.Type, Collidable);