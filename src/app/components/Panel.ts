import { App, UIScaleFactor } from 'app';
import { LayoutView } from 'app/components';
import { mesh, Container, Point, RenderTexture, Sprite, Texture } from 'pixi.js';

export class Panel extends Container implements LayoutView {
  public readonly content = new Container();

  private panelBg = new Sprite(Texture.WHITE);
  private panelMask = new mesh.NineSlicePlane(Texture.fromFrame('sprites/ui/panel-mask'), 6, 6, 6, 6);
  private maskTex = RenderTexture.create(0, 0);
  private panelBorder = new mesh.NineSlicePlane(Texture.fromFrame('sprites/ui/panel'), 6, 6, 6, 6);

  private _contentWidth = 0;
  private _contentHeight = 0;
  public get contentWidth() { return this._contentWidth; }
  public get contentHeight() { return this._contentHeight; }

  constructor(private readonly app: App) {
    super();
    this.panelMask.scale = new Point(UIScaleFactor, UIScaleFactor);
    this.panelBorder.scale = new Point(UIScaleFactor, UIScaleFactor);
    this.panelBg.tint = 0x404040;
    const mask = new Sprite(this.maskTex);

    this.content.addChild(this.panelBg);
    this.addChild(this.content);
    this.content.mask = mask;
    this.addChild(this.panelBorder);
    this.addChild(mask);
  }

  public layout(width: number, height: number) {
    this.panelBorder.width = width / UIScaleFactor;
    this.panelBorder.height = height / UIScaleFactor;
    this.panelBg.width = width;
    this.panelBg.height = height;
    this.panelMask.width = this.panelBorder.width;
    this.panelMask.height = this.panelBorder.height;

    if (this._contentWidth !== width || this._contentHeight !== height || !this.maskTex) {
      this.content.x = 0;
      this.content.y = 0;
      this._contentWidth = width;
      this._contentHeight = height;

      this.maskTex.resize(width, height);
      this.app.renderer.render(this.panelMask, this.maskTex);
    }
  }
}