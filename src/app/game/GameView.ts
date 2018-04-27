import { LayoutView } from 'app/components';
import { Camera } from 'app/game/Camera';
import { Container } from 'pixi.js';

export class GameView extends Container {
  public readonly camera = new Camera();

  constructor() {
    super();
    this.add(this.camera);
  }

  public add(view: LayoutView) {
    this.addChild(view);
  }

  public layout(width: number, height: number) {
    for (const child of this.children) {
      (child as LayoutView).layout(width, height);
    }
  }
}