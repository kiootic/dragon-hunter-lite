import { UIScaleFactor } from 'app';
import { MapChange } from 'app/game/map';
import { Task } from 'app/game/Task';
import { Sprite, Texture } from 'pixi.js';

const ObjectAlpha = 0.25;

export class MiniMapTask extends Task {
  private canvas!: HTMLCanvasElement;
  private mapData!: Uint8ClampedArray;
  private sprite!: Sprite;

  public init() {
    const { width, height } = this.game.map;
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.mapData = new Uint8ClampedArray(width * height * 4);

    this.game.map.changes$.subscribe(this.onMapUpdate);
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++)
        this.renderTile(x, y);
    }
    this.updateCanvas();

    const tex = Texture.fromCanvas(this.canvas);
    this.game.view.minimap.mapSprite.texture = tex;
  }

  public update(dt: number) {
    const { offsetX: x, offsetY: y } = this.game.view.camera;
    const scale = 16 * UIScaleFactor;
    this.game.view.minimap.setOffset(-x / scale, -y / scale);
  }

  private onMapUpdate = ({ x, y }: MapChange) => (this.renderTile(x, y), this.updateCanvas());
  private renderTile(x: number, y: number) {
    const index = (x + y * this.game.map.width) * 4;

    function parseColor(color: string) {
      if (!color) return null;
      const colorNum = parseInt(color, 16);
      return [(colorNum >>> 16) & 0xff, (colorNum >>> 8) & 0xff, (colorNum >>> 0) & 0xff];
    }

    const terrain = this.game.library.terrains[this.game.map.getTerrain(x, y)];
    const terrainColor = terrain ? parseColor(terrain.color)! : [0, 0, 0];

    const object = this.game.library.objects[this.game.map.getObject(x, y)];
    const objectColor = object ? parseColor(object.color) : null;

    let color = terrainColor;
    if (objectColor !== null) {
      color = [
        terrainColor[0] * (1 - ObjectAlpha) + objectColor[0] * ObjectAlpha,
        terrainColor[1] * (1 - ObjectAlpha) + objectColor[1] * ObjectAlpha,
        terrainColor[2] * (1 - ObjectAlpha) + objectColor[2] * ObjectAlpha
      ];
    }

    this.mapData[index] = color[0];
    this.mapData[index + 1] = color[1];
    this.mapData[index + 2] = color[2];
    this.mapData[index + 3] = 0xff;
  }

  private updateCanvas() {
    const ctx = this.canvas.getContext('2d')!;
    const img = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    img.data.set(this.mapData);
    ctx.putImageData(img, 0, 0);
  }
}