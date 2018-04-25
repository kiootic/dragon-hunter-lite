import { Panel } from 'app/components';
import { vec2 } from 'gl-matrix';
import { Sprite } from 'pixi.js';

const Opacity = 0.8;
export class MiniMapPanel extends Panel {
  public readonly mapSprite = new Sprite();
  public isFullscreen = false;
  private isMouseOver = false;

  private readonly _offset = vec2.create();
  public setOffset(offset: vec2) {
    vec2.copy(this._offset, offset);
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
      this.mapSprite.position.set(
        -this._offset[0] + (width - 32) / 2,
        -this._offset[1] + (height - 32) / 2
      );
    } else {
      this.x = width - 16 - 256;
      this.y = 16;
      super.layout(256, 256);
      this.mapSprite.scale.set(4, 4);
      this.alpha = this.isMouseOver ? 1 : Opacity;
      this.mapSprite.position.set(
        -this._offset[0] * 4 + 256 / 2,
        -this._offset[1] * 4 + 256 / 2
      );
    }
  }
}