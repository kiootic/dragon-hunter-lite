import { vec2 } from 'gl-matrix';
import { Container, Graphics, Sprite as PIXISprite, Texture } from 'pixi.js';

export class Camera extends Container {
  public offset = vec2.create();
  public viewWidth = 0;
  public viewHeight = 0;

  private bg = Object.assign(new PIXISprite(Texture.WHITE), { layer: Camera.Layer.Background });
  constructor() {
    super();
    this.bg.tint = 0x202020;
    this.add(this.bg);
  }

  private nextId = 0;
  public add(sprite: Camera.Sprite) {
    sprite.id = this.nextId++;
    this.addChild(sprite);
  }

  public layout(width: number, height: number) {
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
    this.sortLayers();
  }

  private sortLayers() {
    const children = this.children as Camera.Sprite[];
    children.sort((a, b) => {
      const ao = a.sortOffset || [0, 0], bo = b.sortOffset || [0, 0];
      let d = 0;
      if (d === 0) d = a.layer - b.layer;
      if (d === 0) d = (a.y + ao[1]) - (b.y + bo[1]);
      if (d === 0) d = (a.x + ao[0]) - (b.x + bo[0]);
      if (d === 0) d = a.id! - b.id!;
      return d;
    });
  }
}

export namespace Camera {
  export enum Layer {
    Background = -1,
    Terrain = 0,
    Objects = 1
  }
  export interface Sprite extends PIXISprite {
    id?: number
    layer: Camera.Layer;
    sortOffset?: vec2;
  }
}
