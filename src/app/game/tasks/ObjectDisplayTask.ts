import { Task } from 'app/game/Task';
import { Sprite, Texture, Point, Container, RenderTexture, BaseRenderTexture, SCALE_MODES, Filter } from 'pixi.js';
import { App, UIScaleFactor, DisplayTileSize } from 'app';
import { vec2 } from 'gl-matrix';
import { TextureSprite } from 'app/game/map/TextureSprite';
import { Noise } from 'common/noise';
import { create as createRand } from 'random-seed';

const ObjectSize = 32;

interface TileObjectSprite extends TextureSprite {
  tileX: number;
  tileY: number;
  terrain: boolean;
  jitter: [number, number];
}

export class ObjectDisplayTask extends Task {
  private readonly sprites = new Map<string, TileObjectSprite>();
  private readonly container = new Container();
  private jitterNoiseX!: Noise;
  private jitterNoiseY!: Noise;

  public update(dt: number) {
    const updated = this.updateVisibility();
    this.updateTransforms();
    this.sortObjects();
  }

  public init() {
    this.game.view.camera.addChild(this.container);
    const rand = createRand(this.game.map.seed);
    this.jitterNoiseX = new Noise(rand, 1, 1);
    this.jitterNoiseY = new Noise(rand, 1, 1);
  }

  public dispose() {
    this.game.view.camera.removeChild(this.container);
  }

  private updateVisibility() {
    const { offsetX, offsetY, viewWidth: w, viewHeight: h } = this.game.view.camera;
    function isVisible(x: number, y: number) {
      return x >= offsetX - DisplayTileSize && x <= offsetX + w + DisplayTileSize &&
        y >= offsetY - DisplayTileSize && y <= offsetY + h + DisplayTileSize;
    }

    const removePool: TileObjectSprite[] = [];
    let updated = false;

    for (const [key, sprite] of this.sprites) {
      if (!isVisible(sprite.tileX * DisplayTileSize, sprite.tileY * DisplayTileSize)) {
        removePool.push(sprite);
        this.sprites.delete(key);
        updated = true;
      }
    }

    const map = this.game.map;
    const left = Math.max(0, Math.floor(offsetX / DisplayTileSize));
    const right = Math.min(map.width - 1, Math.ceil((offsetX + w) / DisplayTileSize));
    const top = Math.max(0, Math.floor(offsetY / DisplayTileSize));
    const bottom = Math.min(map.height - 1, Math.ceil((offsetY + h) / DisplayTileSize));

    const objectData = App.instance.library.objects;
    for (let x = left; x <= right; x++)
      for (let y = top; y <= bottom; y++) {
        const obj = objectData[map.getObject(x, y)];
        if (!obj) continue;

        const tx = x * DisplayTileSize;
        const ty = y * DisplayTileSize;
        if (!isVisible(tx, ty))
          continue;

        const key = `${x}:${y}`;
        if (this.sprites.has(key)) continue;

        const sprite = removePool.pop() || new TextureSprite();
        sprite.outline = true;
        sprite.setTexture(obj.texture, x + y * map.width);
        if (!sprite.parent)
          this.container.addChild(sprite);

        const jitter: [number, number] = [0, 0];
        if (obj.jitter) {
          jitter[0] = Math.round((this.jitterNoiseX.noise2D(x, y) * 2 - 1) * (DisplayTileSize / 3));
          jitter[1] = Math.round((this.jitterNoiseY.noise2D(x, y) * 2 - 1) * (DisplayTileSize / 3));
        }
        this.sprites.set(key, Object.assign(sprite, { tileX: x, tileY: y, jitter, terrain: obj.terrain || false }));
        updated = true;
      }

    for (const sprite of removePool)
      this.container.removeChild(sprite);
    return updated;
  }

  private updateTransforms() {
    const { offsetX: dx, offsetY: dy } = this.game.view.camera;
    const map = this.game.map;
    const objectData = App.instance.library.objects;

    for (const [key, sprite] of this.sprites) {
      const obj = objectData[map.getObject(sprite.tileX, sprite.tileY)];

      sprite.anchor.set(0.5, 1);

      const scale = (DisplayTileSize / ObjectSize) * (obj.scale || 1);
      sprite.scale.set(scale, scale);

      const tx = (sprite.tileX + 0.5) * DisplayTileSize + sprite.jitter[0];
      const ty = (sprite.tileY + 1) * DisplayTileSize + sprite.jitter[1];
      sprite.position.set(tx - dx, ty - dy);
    }
  }

  private sortObjects() {
    this.container.children.sort((a, b) => {
      let ay = a.y, by = b.y;
      if ((a as TileObjectSprite).terrain) ay = -ay;
      if ((b as TileObjectSprite).terrain) by = -by;

      let d = ay - by;
      if (d === 0) d = a.x - b.x;
      return d;
    });
  }
}