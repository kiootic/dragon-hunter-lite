import { Task } from 'app/game/Task';
import { Sprite, Texture, Point, Container, RenderTexture, BaseRenderTexture, SCALE_MODES, Filter } from 'pixi.js';
import { App, UIScaleFactor } from 'app';
import { vec2 } from 'gl-matrix';
import { TextureSprite } from 'app/game/map/TextureSprite';

interface TileObjectSprite extends TextureSprite {
  tileX: number;
  tileY: number;
}

export class ObjectDisplayTask extends Task {
  private readonly sprites = new Map<string, TileObjectSprite>();
  private readonly container = new Container();

  public update(dt: number) {
    this.updateVisibility();
    this.updateTransforms();
  }

  public init() {
    this.game.view.camera.addChild(this.container);
  }

  public dispose() {
    this.game.view.camera.removeChild(this.container);
  }

  private updateVisibility() {
    const { offsetX: x, offsetY: y, viewWidth: w, viewHeight: h } = this.game.view.camera;
    const r = Math.ceil(Math.sqrt(w * w + h * h));
    const origin = vec2.fromValues(x, y);
    const scale = 16 * UIScaleFactor;
    function isVisible(x: number, y: number) {
      return vec2.sqrDist(origin, [x, y]) <= r * r;
    }

    const removePool: TileObjectSprite[] = [];

    for (const [key, sprite] of this.sprites) {
      if (!isVisible(sprite.tileX * scale, sprite.tileY * scale)) {
        removePool.push(sprite);
        this.sprites.delete(key);
      }
    }

    const map = this.game.map;
    const left = Math.max(0, Math.floor((x - r) / scale));
    const right = Math.min(map.width - 1, Math.ceil((x + r) / scale));
    const top = Math.max(0, Math.floor((y - r) / scale));
    const bottom = Math.min(map.height - 1, Math.ceil((y + r) / scale));

    const objectData = App.instance.library.objects;
    for (let x = left; x <= right; x++)
      for (let y = top; y <= bottom; y++) {
        const obj = objectData[map.getObject(x, y)];
        if (!obj) continue;

        const tx = x * scale;
        const ty = y * scale;
        if (!isVisible(tx, ty))
          continue;

        const key = `${x}:${y}`;
        if (this.sprites.has(key)) continue;

        const sprite = removePool.pop() || new TextureSprite();
        sprite.setTexture(obj.texture, x + y * map.width);
        if (!sprite.parent)
          this.container.addChild(sprite);
        this.sprites.set(key, Object.assign(sprite, { tileX: x, tileY: y }));
      }

    for (const sprite of removePool)
      this.container.removeChild(sprite);
  }

  private updateTransforms() {
    const { offsetX: dx, offsetY: dy } = this.game.view.camera;
    const map = this.game.map;
    const objectData = App.instance.library.objects;

    for (const [key, sprite] of this.sprites) {
      const obj = objectData[map.getObject(sprite.tileX, sprite.tileY)];

      const scale = UIScaleFactor * (obj.scale || 1);
      sprite.scale.set(scale, scale);
      sprite.anchor.set(0.5, 1);
      const tx = (sprite.tileX + 0.5) * 16 * UIScaleFactor;
      const ty = (sprite.tileY + 1) * 16 * UIScaleFactor;
      sprite.position.set(tx - dx, ty - dy);
    }
  }
}