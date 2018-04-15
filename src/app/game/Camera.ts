import { Container, DisplayObject, Texture, Sprite } from "pixi.js";

export interface CameraObject extends DisplayObject {
  layout(camera: Camera): void;
}

export class Camera extends Container {
  public offsetX = 0;
  public offsetY = 0;
  public viewWidth = 0;
  public viewHeight = 0;

  private bg = new Sprite(Texture.WHITE);
  constructor() {
    super();
    this.bg.tint = 0xff0000;
    this.addChild(this.bg);
  }

  public addObject(obj: CameraObject) {
    this.addChild(obj);
  }

  public layout(x: number, y: number, width: number, height: number) {
    this.offsetX = x;
    this.offsetY = y;
    this.viewWidth = width;
    this.viewHeight = height;
    this.bg.width = width;
    this.bg.height = height;

    for (const child of this.children) {
      const obj = child as CameraObject;
      if (obj.layout) obj.layout(this);
      obj.x = -this.offsetX;
      obj.y = -this.offsetY;
    }
  }
}