import { Panel } from 'app/components';
import { Game } from 'app/game';
import { HUDElement } from 'app/game/hud';
import { Spatial } from 'app/game/traits';
import { vec2 } from 'gl-matrix';
import { Sprite, Texture } from 'pixi.js';

const Opacity = 0.8;
const ObjectAlpha = 0.25;

export class MiniMap extends Panel implements HUDElement {
  public readonly display = this;

  private readonly offset: vec2;
  private readonly mapSprite = new Sprite();
  private isFullscreen = false;
  private isMouseOver = false;

  private mapDirty = false;
  private readonly canvas: HTMLCanvasElement;
  private readonly mapData: Uint8ClampedArray;

  constructor(private readonly game: Game) {
    super(game.app);
    this.offset = this.game.player.traits.get(Spatial).position;

    this.content.addChild(this.mapSprite);
    this.mapSprite.anchor.set(0, 0);
    this.alpha = Opacity;

    this.content.interactive = true;
    this.content.on('pointerover', () => this.isMouseOver = true);
    this.content.on('pointerout', () => this.isMouseOver = false);
    this.content.on('pointerdown', () => this.isFullscreen = true);
    this.content.on('pointerup', () => this.isFullscreen = false);
    this.content.on('pointerupoutside', () => this.isFullscreen = false);

    const map = this.game.map;
    this.canvas = document.createElement('canvas');
    this.canvas.width = map.width;
    this.canvas.height = map.height;
    this.mapData = new Uint8ClampedArray(map.width * map.height * 4);
    this.mapSprite.texture = Texture.fromCanvas(this.canvas);

    this.game.map.changes$.subscribe(({ x, y }) => this.renderTile(x, y));
    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++)
        this.renderTile(x, y);
    }
    this.update();
  }

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
    this.mapDirty = true;
  }

  update() {
    if (!this.mapDirty) return;

    const ctx = this.canvas.getContext('2d')!;
    const img = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    img.data.set(this.mapData);
    ctx.putImageData(img, 0, 0);
    this.mapSprite.texture.update();
    this.mapDirty = false;
  }

  layout(width: number, height: number) {
    if (this.isFullscreen) {
      this.x = 16;
      this.y = 16;
      super.layout(width - 32, height - 32);
      this.mapSprite.scale.set(1, 1);
      this.alpha = 1;
      this.mapSprite.position.set(
        -this.offset[0] + (width - 32) / 2,
        -this.offset[1] + (height - 32) / 2
      );
    } else {
      this.x = width - 16 - 256;
      this.y = 16;
      super.layout(256, 256);
      this.mapSprite.scale.set(4, 4);
      this.alpha = this.isMouseOver ? 1 : Opacity;
      this.mapSprite.position.set(
        -this.offset[0] * 4 + 256 / 2,
        -this.offset[1] * 4 + 256 / 2
      );
    }
  }
}