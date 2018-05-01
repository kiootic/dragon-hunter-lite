import { DisplayTileSize } from 'app';
import { TextureSprite } from 'app/components';
import { Game } from 'app/game';
import { TileObjectSprite } from 'app/game/interfaces';
import { Task } from 'app/game/tasks';
import { Camera } from 'app/game/Camera';
import { TileObject } from 'common/data';
import { Noise } from 'common/noise';
import { vec2 } from 'gl-matrix';
import { Rectangle } from 'pixi.js';
import { create as createRand } from 'random-seed';

const ObjectSize = 32;
const MarginSize = 5;

class ObjectSprite extends TextureSprite implements Camera.Sprite, TileObjectSprite {
  public readonly jitter = vec2.fromValues(0, 0);
  public readonly sortOffset = vec2.fromValues(0, 0);
  public layer = Camera.Layer.Objects;
  public readonly coords = vec2.fromValues(-1, -1);

  constructor(public readonly game: Game) {
    super();
    this.outline = true;
    this.anchor.set(0.5, 1);
  }

  public setTile(x: number, y: number, obj: TileObject) {
    vec2.set(this.coords, x, y);

    this.layer = obj.terrain ? Camera.Layer.Terrain : Camera.Layer.Objects;
    this.setTexture(obj.texture, x + y * this.game.map.width);

    const scale = obj.scale || 1;

    const sw = ObjectSize / scale, sh = ObjectSize / scale;
    this.hitArea = new Rectangle(-sw / 2, -sh, sw, sh);
    this.interactive = obj.interactive || false;

    const displayScale = scale * DisplayTileSize / ObjectSize;
    this.scale.set(displayScale, displayScale);
  }
}

function tileKey(x: number, y: number) {
  return `${x}:${y}`;
}

export class ObjectDisplayTask extends Task {
  private readonly sprites = new Map<string, ObjectSprite>();
  private readonly jitterNoiseX: Noise;
  private readonly jitterNoiseY: Noise;

  constructor(game: Game) {
    super(game);

    const rand = createRand(this.game.map.props.seed);
    this.jitterNoiseX = new Noise(rand, 1, 1);
    this.jitterNoiseY = new Noise(rand, 1, 1);
    this.game.map.changes$.subscribe(({ x, y }) => {
      const key = tileKey(x, y);
      const sprite = this.sprites.get(key);
      if (sprite) {
        this.game.view.camera.removeChild(sprite);
        this.sprites.delete(key);
      }
    });
  }

  public update(dt: number) {
    this.updateVisibility();
    this.updateSprites(dt);
    this.updateTransforms();
  }

  private updateVisibility() {
    const { offset: [offsetX, offsetY], viewWidth: w, viewHeight: h } = this.game.view.camera;
    const margin = MarginSize * DisplayTileSize;
    const halfW = w / 2 + margin, halfH = h / 2 + margin;
    function isVisible(x: number, y: number) {
      return x >= offsetX - halfW && x <= offsetX + halfW &&
        y >= offsetY - halfH && y <= offsetY + halfH;
    }

    const removePool: ObjectSprite[] = [];
    let updated = false;

    for (const [key, sprite] of this.sprites) {
      if (!isVisible(sprite.coords[0] * DisplayTileSize, sprite.coords[1] * DisplayTileSize)) {
        removePool.push(sprite);
        this.sprites.delete(key);
        updated = true;
      }
    }

    const map = this.game.map;
    const left = Math.max(0, Math.floor((offsetX - halfW) / DisplayTileSize));
    const right = Math.min(map.width - 1, Math.ceil((offsetX + halfW) / DisplayTileSize));
    const top = Math.max(0, Math.floor((offsetY - halfH) / DisplayTileSize));
    const bottom = Math.min(map.height - 1, Math.ceil((offsetY + halfH) / DisplayTileSize));

    const objectData = this.game.library.objects;
    for (let x = left; x <= right; x++)
      for (let y = top; y <= bottom; y++) {
        const obj = objectData[map.getObject(x, y)];
        if (!obj) continue;

        const tx = x * DisplayTileSize;
        const ty = y * DisplayTileSize;
        if (!isVisible(tx, ty))
          continue;

        const key = tileKey(x, y);
        if (this.sprites.has(key)) continue;

        const sprite = removePool.pop() || new ObjectSprite(this.game);
        sprite.setTile(x, y, obj);
        if (obj.jitter) {
          sprite.jitter[0] = Math.round((this.jitterNoiseX.noise2D(x, y) * 2 - 1) * (DisplayTileSize / 3));
          sprite.jitter[1] = Math.round((this.jitterNoiseY.noise2D(x, y) * 2 - 1) * (DisplayTileSize / 3));
        }

        if (!sprite.parent)
          this.game.view.camera.add(sprite);

        this.sprites.set(key, sprite);
        updated = true;
      }

    for (const sprite of removePool)
      this.game.view.camera.removeChild(sprite);
    return updated;
  }

  private elapsed = 0;
  private updateSprites(dt: number) {
    this.elapsed += dt;
    for (const sprite of this.sprites.values())
      (sprite as TextureSprite).update(this.elapsed);
  }

  private updateTransforms() {
    const { offset: [dx, dy], viewWidth: w, viewHeight: h } = this.game.view.camera;
    const map = this.game.map;
    const objectData = this.game.library.objects;

    for (const sprite of this.sprites.values()) {
      const obj = objectData[map.getObject(sprite.coords[0], sprite.coords[1])];

      const tx = (sprite.coords[0] + 0.5) * DisplayTileSize + sprite.jitter[0];
      const ty = (sprite.coords[1] + (obj.terrain ? 1 : 0.5)) * DisplayTileSize + sprite.jitter[1];
      sprite.position.set(tx - dx + Math.floor(w / 2), ty - dy + Math.floor(h / 2));
    }
  }
}