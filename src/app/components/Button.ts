import { Container, Sprite, Texture, mesh, Point } from 'pixi.js';
import { times } from 'lodash';
import { UIScaleFactor } from 'app';

export class Button extends Container {
  public static readonly Clicked = 'button.clicked';

  public readonly content = new Container();
  private texNormal = Texture.fromFrame('sprites/ui/button-normal');
  private texPressed = Texture.fromFrame('sprites/ui/button-pressed');

  private plane = new mesh.NineSlicePlane(this.texNormal, 6, 6, 6, 6);
  private isPressed = false;
  private updateState(pressed: boolean) {
    if (!this._isEnabled) pressed = false;
    this.isPressed = pressed;
    this.plane.texture = pressed ? this.texPressed : this.texNormal;
  }

  private _contentWidth = 0;
  private _contentHeight = 0;
  public get contentWidth() { return this._contentWidth; }
  public get contentHeight() { return this._contentHeight; }

  private _isEnabled = true;
  public get isEnabled() { return this._isEnabled; }
  public set isEnabled(value: boolean) {
    this._isEnabled = value;
    this.updateState(false);
    if (!value) {
      this.alpha = 0.5;
    } else {
      this.alpha = 1;
    }
  }

  constructor() {
    super();
    this.addChild(this.plane);
    this.addChild(this.content);
    this.plane.scale = new Point(UIScaleFactor, UIScaleFactor);
    this.interactive = true;
    this.buttonMode = true;

    this.on('pointerdown', () => this.updateState(true));
    this.on('pointerupoutside', () => this.updateState(false));
    this.on('pointerup', () => {
      this.updateState(false);
      if (this._isEnabled)
        this.emit(Button.Clicked);
    });
  }

  public layout(width: number, height: number) {
    this.plane.x = 0;
    this.plane.y = 0;
    this.plane.width = width / UIScaleFactor;
    this.plane.height = height / UIScaleFactor;

    if (this.isPressed) {
      this.content.x = UIScaleFactor;
      this.content.y = UIScaleFactor;
      this._contentWidth = width - UIScaleFactor;
      this._contentHeight = height - UIScaleFactor;
    } else {
      this.content.x = 0;
      this.content.y = 0;
      this._contentWidth = width - UIScaleFactor;
      this._contentHeight = height - UIScaleFactor;
    }
  }
}