import { App, DisplayTileSize } from 'app';
import { Camera } from 'app/game/Camera';
import { Game } from 'app/game/Game';
import { TextureSprite } from 'app/game/map';
import { Task } from 'app/game/Task';
import { vec2 } from 'gl-matrix';
import { Container, RenderTexture, SCALE_MODES, Sprite } from 'pixi.js';

const TileSize = 16;

export class TerrainDisplayTask extends Task {
  private readonly sprites = new Map<string, Sprite>();
  private readonly container = new Container();
  private readonly renderTex = RenderTexture.create(1, 1, SCALE_MODES.NEAREST);
  private readonly view = Object.assign(new Sprite(this.renderTex), { layer: Camera.Layer.Terrain });

  constructor(game: Game) {
    super(game);
    this.game.view.camera.add(this.view);
  }

  public update(dt: number) {
    this.updateVisibility();
    this.updateSprites(dt);
    this.render();
  }

  private updateVisibility() {
    const { offset: [x, y], viewWidth: w, viewHeight: h } = this.game.view.camera;
    const r = Math.ceil(Math.sqrt(w * w + h * h));
    const origin = vec2.fromValues(x, y);
    const scale = DisplayTileSize / TileSize;
    function isVisible(x: number, y: number) {
      return vec2.sqrDist(origin, [x * scale, y * scale]) <= r * r;
    }

    for (const [key, sprite] of this.sprites) {
      if (!isVisible(sprite.x, sprite.y)) {
        this.container.removeChild(sprite);
        this.sprites.delete(key);
      }
    }

    const map = this.game.map;
    const left = Math.max(0, Math.floor((x - r) / DisplayTileSize));
    const right = Math.min(map.width - 1, Math.ceil((x + r) / DisplayTileSize));
    const top = Math.max(0, Math.floor((y - r) / DisplayTileSize));
    const bottom = Math.min(map.height - 1, Math.ceil((y + r) / DisplayTileSize));

    const terrainData = this.game.library.terrains;
    for (let x = left; x <= right; x++)
      for (let y = top; y <= bottom; y++) {
        const terrain = terrainData[map.getTerrain(x, y)];
        if (!terrain) continue;

        const tx = x * TileSize;
        const ty = y * TileSize;
        if (!isVisible(tx, ty))
          continue;

        const key = `${x}:${y}`;
        if (this.sprites.has(key)) continue;

        const sprite = new TextureSprite();
        sprite.setTexture(terrain.texture, x + y * map.width);
        sprite.x = tx;
        sprite.y = ty;
        this.container.addChild(sprite);
        this.sprites.set(key, sprite);
      }
  }

  private updateSprites(dt: number) {
    for (const sprite of this.container.children)
      (sprite as TextureSprite).update(dt);
  }

  private render() {
    const { offset: [x, y], viewWidth: w, viewHeight: h } = this.game.view.camera;
    const r = Math.ceil(Math.sqrt(w * w + h * h));

    let minX: number = Number.MAX_VALUE, minY: number = Number.MAX_VALUE;
    for (const sprite of this.sprites.values()) {
      minX = Math.min(minX, sprite.x);
      minY = Math.min(minY, sprite.y);
    }
    this.container.setTransform(-minX, -minY);

    const length = Math.ceil(r / DisplayTileSize) * TileSize * 2;
    const texSize = 1 << (32 - Math.clz32(length - 1));
    this.renderTex.resize(texSize, texSize);
    App.instance.renderer.render(this.container, this.renderTex);
    const scale = DisplayTileSize / TileSize;
    this.view.setTransform(
      (minX * scale - x + w / 2), (minY * scale - y + h / 2),
      scale, scale
    );
  }
}