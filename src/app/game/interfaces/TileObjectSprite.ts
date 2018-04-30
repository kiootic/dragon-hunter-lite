import { TextureSprite } from 'app/components';
import { vec2 } from 'gl-matrix';

export interface TileObjectSprite extends TextureSprite {
  readonly coords: vec2;
  readonly jitter: vec2;
}