import { App, UIScaleFactor } from 'app';
import { mesh, Container, DisplayObject, Point, RenderTexture, Sprite, Texture } from 'pixi.js';

export class Panel extends Container {
  public readonly content = new Container();

  private panelBg = new Sprite(Texture.WHITE);
  private panelMask = new mesh.NineSlicePlane(Texture.fromFrame('sprites/ui/panel-mask'), 6, 6, 6, 6);
  private maskTex = RenderTexture.create(0, 0);
  private panelBorder = new mesh.NineSlicePlane(Texture.fromFrame('sprites/ui/panel'), 6, 6, 6, 6);

  private _contentWidth = 0;
  private _contentHeight = 0;
  public get contentWidth() { return this._contentWidth; }
  public get contentHeight() { return this._contentHeight; }

  constructor() {
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

    // Workaround for outside events not firing due to pixi.js#4608
    // Passes outside events to children
    this.interactive = true;
    this.emit = (event, ...args) => {
      if (event.toString().endsWith('upoutside')) {
        function triggerEvent(obj: DisplayObject) {
          args[0].currentTarget = obj;
          obj.emit(event, ...args);
          if (obj.interactiveChildren && (obj as Container).children) {
            for (const child of (obj as Container).children)
              triggerEvent(child);
          }
        }
        triggerEvent(this.content);
      }
      return super.emit(event, ...args);
    };
    (this as any).containsPoint = mask.containsPoint.bind(mask);
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
      App.instance.renderer.render(this.panelMask, this.maskTex);
    }
  }
}