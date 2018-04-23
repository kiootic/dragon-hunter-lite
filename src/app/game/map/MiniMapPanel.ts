import { Panel } from 'app/components';
import { Sprite, Point } from 'pixi.js';
import { Camera } from 'app/game/Camera';
import { UIScaleFactor } from 'app';

const Opacity = 0.8;
export class MiniMapPanel extends Panel {
  public readonly mapSprite = new Sprite();
  public isFullscreen = false;
  private isMouseOver = false;

  private _offset = new Point();
  public setOffset(x: number, y: number) {
    this._offset.set(x, y);
  }

  constructor() {
    super();
    this.content.addChild(this.mapSprite);
    this.mapSprite.anchor.set(0, 0);
    this.alpha = Opacity;

    this.interactive = true;
    this.on('pointerover', () => this.isMouseOver = true);
    this.on('pointerout', () => this.isMouseOver = false);
    this.on('pointerdown', () => this.isFullscreen = true);
    this.on('pointerup', () => this.isFullscreen = false);
    this.on('pointerupoutside', () => this.isFullscreen = false);
  }

  layout(width: number, height: number) {
    if (this.isFullscreen) {
      this.x = 16;
      this.y = 16;
      super.layout(width - 32, height - 32);
      this.mapSprite.scale.set(1, 1);
      this.alpha = 1;
    } else {
      this.x = width - 16 - 256;
      this.y = 16;
      super.layout(256, 256);
      this.mapSprite.scale.set(UIScaleFactor, UIScaleFactor);
      this.alpha = this.isMouseOver ? 1 : Opacity;
    }

    this.mapSprite.position.set(
      this._offset.x * this.mapSprite.scale.x,
      this._offset.y * this.mapSprite.scale.y
    );
  }
}