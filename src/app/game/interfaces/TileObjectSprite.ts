import { vec2 } from 'gl-matrix';
import { DisplayObject } from 'pixi.js';

export interface TileObjectSprite extends DisplayObject {
  readonly coords: vec2;
}