import { Task } from 'app/game/Task';
import { MapChange } from 'app/game/map';
import { App, UIScaleFactor } from 'app';
import { Texture, Sprite } from 'pixi.js';

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

    const terrain = App.instance.library.terrains[this.game.map.getTerrain(x, y)];
    const terrainColor = terrain ? parseInt(terrain.color, 16) : 0xff000000;

    this.mapData[index] = (terrainColor >>> 16) & 0xff;
    this.mapData[index + 1] = (terrainColor >>> 8) & 0xff;
    this.mapData[index + 2] = (terrainColor >>> 0) & 0xff;
    this.mapData[index + 3] = (terrainColor >>> 24) & 0xff;
  }

  private updateCanvas() {
    const ctx = this.canvas.getContext('2d')!;
    const img = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    img.data.set(this.mapData);
    ctx.putImageData(img, 0, 0);
  }
}