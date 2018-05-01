import { DisplayTileSize } from 'app';
import { vec2 } from 'gl-matrix';
import { Container, Graphics, PointLike, Sprite as PIXISprite, Texture, TransformStatic } from 'pixi.js';

export class Camera extends Container {
  public offset = vec2.create();
  public viewWidth = 0;
  public viewHeight = 0;

  public toMapCoords(pt: PointLike, coords: vec2) {
    vec2.scaleAndAdd(coords, [
      (pt.x - Math.floor(this.viewWidth / 2)) / DisplayTileSize,
      (pt.y - Math.floor(this.viewHeight / 2)) / DisplayTileSize
    ], this.offset, 1 / DisplayTileSize);
    return coords;
  }

  public toCameraPoint(coords: vec2, pt: PointLike, z = 0) {
    pt.x = Math.floor(coords[0] * DisplayTileSize - this.offset[0]) + Math.floor(this.viewWidth / 2);
    pt.y = Math.floor((coords[1] - z) * DisplayTileSize - this.offset[1]) + Math.floor(this.viewHeight / 2);
    return pt;
  }

  private bg = Object.assign(new PIXISprite(Texture.WHITE), {
    layer: Camera.Layer.Background,
    sortOffset: vec2.fromValues(0, 0)
  });

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
      const ao = a.sortOffset, bo = b.sortOffset;
      const { x: ax, y: ay } = (a.transform as TransformStatic).position;
      const { x: bx, y: by } = (b.transform as TransformStatic).position;
      let d = 0;
      if (d === 0) d = a.layer - b.layer;
      if (d === 0) d = (ay + ao[1] * DisplayTileSize) - (by + bo[1] * DisplayTileSize);
      if (d === 0) d = (ax + ao[0] * DisplayTileSize) - (bx + bo[0] * DisplayTileSize);
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
    sortOffset: vec2;
  }
}
