import { DisplayTileSize } from 'app';
import { Camera } from 'app/game/Camera';
import { Game } from 'app/game/Game';
import { TextureSprite } from 'app/game/map';
import { Task } from 'app/game/Task';
import { Noise } from 'common/noise';
import { create as createRand } from 'random-seed';

const ObjectSize = 32;
const MarginSize = 5;

interface TileObjectSprite extends TextureSprite, Camera.Sprite {
  tileX: number;
  tileY: number;
  jitter: [number, number];
}

export class ObjectDisplayTask extends Task {
  private readonly sprites = new Map<string, TileObjectSprite>();
  private readonly jitterNoiseX: Noise;
  private readonly jitterNoiseY: Noise;

  constructor(game: Game) {
    super(game);

    const rand = createRand(this.game.map.props.seed);
    this.jitterNoiseX = new Noise(rand, 1, 1);
    this.jitterNoiseY = new Noise(rand, 1, 1);
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

        const key = `${x}:${y}`;
        if (this.sprites.has(key)) continue;

        const jitter: [number, number] = [0, 0];
        if (obj.jitter) {
          jitter[0] = Math.round((this.jitterNoiseX.noise2D(x, y) * 2 - 1) * (DisplayTileSize / 3));
          jitter[1] = Math.round((this.jitterNoiseY.noise2D(x, y) * 2 - 1) * (DisplayTileSize / 3));
        }
        const sprite = Object.assign(removePool.pop() || new TextureSprite(), {
          tileX: x, tileY: y,
          jitter,
          layer: obj.terrain ? Camera.Layer.Terrain : Camera.Layer.Objects
        });

        sprite.outline = true;
        sprite.setTexture(obj.texture, x + y * map.width);
        if (!sprite.parent)
          this.game.view.camera.add(sprite);

        this.sprites.set(key, sprite);
        updated = true;
      }

    for (const sprite of removePool)
      this.game.view.camera.removeChild(sprite);
    return updated;
  }

  private updateSprites(dt: number) {
    for (const sprite of this.sprites.values())
      (sprite as TextureSprite).update(dt);
  }

  private updateTransforms() {
    const { offset: [dx, dy], viewWidth: w, viewHeight: h } = this.game.view.camera;
    const map = this.game.map;
    const objectData = this.game.library.objects;

    for (const sprite of this.sprites.values()) {
      const obj = objectData[map.getObject(sprite.tileX, sprite.tileY)];

      sprite.anchor.set(0.5, 1);

      const scale = (DisplayTileSize / ObjectSize) * (obj.scale || 1);
      sprite.scale.set(scale, scale);

      const tx = (sprite.tileX + 0.5) * DisplayTileSize + sprite.jitter[0];
      const ty = (sprite.tileY + 1) * DisplayTileSize + sprite.jitter[1];
      sprite.position.set(tx - dx + Math.floor(w / 2), ty - dy + Math.floor(h / 2));
    }
  }
}