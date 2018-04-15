import { Container, DisplayObject, Texture, Sprite, Graphics } from 'pixi.js';

export class Camera extends Container {
  public offsetX = 0;
  public offsetY = 0;
  public viewWidth = 0;
  public viewHeight = 0;

  private bg = new Sprite(Texture.WHITE);
  constructor() {
    super();
    this.bg.tint = 0xff00ff;
    this.addChild(this.bg);
  }

  public layout(x: number, y: number, width: number, height: number) {
    this.offsetX = x;
    this.offsetY = y;
    this.bg.width = width;
    this.bg.height = height;

    if (this.viewWidth !== width || this.viewHeight !== height) {
      this.viewWidth = width;
      this.viewHeight = height;
      
      const mask = new Graphics();
      mask.beginFill(0xffffff);
      mask.drawRect(this.x, this.y, width, height);
      mask.endFill();
      this.mask = mask;
    }
  }
}