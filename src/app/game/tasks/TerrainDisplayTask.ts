import { Task } from "app/game/Task";
import { Sprite, Texture, Point, Container, RenderTexture, BaseRenderTexture, SCALE_MODES } from "pixi.js";
import { App, UIScaleFactor } from "app";
import { vec2 } from "gl-matrix";

export class TerrainDisplayTask extends Task {
  private readonly sprites = new Map<string, Sprite>();
  private readonly container = new Container();
  private readonly renderTex = new RenderTexture(new BaseRenderTexture(1, 1, SCALE_MODES.NEAREST));
  private readonly view = new Sprite(this.renderTex);

  public update(dt: number) {
    this.updateVisibility();
    this.render();
  }

  public init() {
    this.game.view.camera.addChild(this.view);
  }

  private updateVisibility() {
    const { offsetX: x, offsetY: y, viewWidth: w, viewHeight: h } = this.game.view.camera;
    const r = Math.ceil(Math.sqrt(w * w + h * h));
    const origin = vec2.fromValues(x, y);
    function isVisible(x: number, y: number) {
      return vec2.sqrDist(origin, [x, y]) <= r * r;
    }

    for (const [key, sprite] of this.sprites) {
      if (!isVisible(sprite.x, sprite.y)) {
        this.container.removeChild(sprite);
        this.sprites.delete(key);
      }
    }

    const map = this.game.map;
    const scale = 16 * UIScaleFactor;
    const left = Math.max(0, Math.floor((x - r) / scale));
    const right = Math.min(map.width - 1, Math.ceil((x + r) / scale));
    const top = Math.max(0, Math.floor((y - r) / scale));
    const bottom = Math.min(map.height - 1, Math.ceil((y + r) / scale));

    const terrainData = App.instance.library.terrains;
    for (let x = left; x <= right; x++)
      for (let y = top; y <= bottom; y++) {
        const terrain = terrainData[map.getTerrain(x, y)];
        if (!terrain) continue;

        const tx = x * scale;
        const ty = y * scale;
        if (!isVisible(tx, ty))
          continue;

        const key = `${x}:${y}`;
        if (this.sprites.has(key)) continue;

        const sprite = new Sprite(Texture.fromFrame(terrain.texture));
        sprite.x = tx;
        sprite.y = ty;
        sprite.scale = new Point(UIScaleFactor, UIScaleFactor);
        this.container.addChild(sprite);
        this.sprites.set(key, sprite);
      }
  }

  private render() {
    const { offsetX: x, offsetY: y, viewWidth: w, viewHeight: h } = this.game.view.camera;
    const r = Math.ceil(Math.sqrt(w * w + h * h));

    let minX: number = -1, minY: number = -1;
    for (const sprite of this.sprites.values()) {
      if (minX < 0 || sprite.x < minX)
        minX = sprite.x;
      if (minY < 0 || sprite.y < minY)
        minY = sprite.y;
    }
    this.container.setTransform(-minX, -minY);

    const length = 1 << (32 - Math.clz32(r * 2 - 1));
    this.renderTex.resize(length, length);
    App.instance.renderer.render(this.container, this.renderTex);
    this.view.setTransform((minX - x), (minY - y));
  }
}