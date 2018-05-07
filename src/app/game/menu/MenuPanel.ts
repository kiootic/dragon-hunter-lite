import { LayoutView } from 'app/components';
import { Container, Texture } from 'pixi.js';

export abstract class MenuPanel extends Container implements LayoutView {
  active = false;

  abstract get icon(): Texture;
  abstract get name(): string;

  abstract layout(width: number, height: number): void;
  dispose(exit: boolean) { }
  update(dt: number) { }
}