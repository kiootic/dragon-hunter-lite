import { DisplayObject } from 'pixi.js';

export interface LayoutView extends DisplayObject {
  layout(width: number, height: number): void;
}