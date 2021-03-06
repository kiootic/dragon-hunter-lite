import { TextureSprite } from 'app/components';
import { Trait } from 'app/game/traits';
import { Camera } from 'app/game/Camera';
import { vec2 } from 'gl-matrix';
import { defaults } from 'lodash';

export interface Spatial extends Trait {
  readonly type: typeof Spatial.Type;
  readonly position: vec2;
  readonly velocity: vec2;
  readonly scale: vec2;
  readonly offset: vec2;
  horizontalAnim: boolean;
  readonly sprite: Camera.Sprite & TextureSprite;
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
      offset: vec2.fromValues(0, 0),
      horizontalAnim: false,
      sprite: Object.assign(new TextureSprite(), {
        layer: Camera.Layer.Objects,
        sortOffset: vec2.fromValues(0, 0),
      })
    };
  }

  export function serialize(trait: Spatial) {
    return {
      pos: [trait.position[0], trait.position[1]],
      vel: [trait.velocity[0], trait.velocity[1]],
    };
  }

  export function deserialize(data: any, trait: Spatial): Spatial {
    return defaults({
      position: data.pos && vec2.fromValues(data.pos[0], data.pos[1]),
      velocity: data.vel && vec2.fromValues(data.vel[0], data.vel[1])
    }, trait);
  }
}
Trait.types.set(Spatial.Type, Spatial);