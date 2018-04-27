import { App, DisplayTileSize } from 'app';
import { TextureSprite } from 'app/components';
import { Game } from 'app/game';
import { Task } from 'app/game/tasks';
import { Camera } from 'app/game/Camera';
import { vec2 } from 'gl-matrix';
import { Container, RenderTexture, Sprite, SCALE_MODES, TransformStatic } from 'pixi.js';

const TileSize = 16;

export class TerrainDisplayTask extends Task {
  private readonly sprites = new Map<string, TextureSprite>();
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
    const r = Math.ceil(Math.sqrt(w * w + h * h) / 2 + DisplayTileSize);
    const origin = vec2.fromValues(x, y);
    const scale = DisplayTileSize / TileSize;
    function isVisible(x: number, y: number) {
      const dx = x * scale - origin[0], dy = y * scale - origin[1];
      return (dx * dx + dy * dy) <= r * r;
    }

    const removePool: TextureSprite[] = [];
    for (const [key, sprite] of this.sprites) {
      const { x, y } = (sprite.transform as TransformStatic).position;
      if (!isVisible(x, y)) {
        removePool.push(sprite);
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

        const sprite = removePool.pop() || new TextureSprite();
        sprite.setTexture(terrain.texture, x + y * map.width);
        sprite.position.set(tx, ty);
        if (!sprite.parent)
          this.container.addChild(sprite);
        this.sprites.set(key, sprite);
      }

    for (const sprite of removePool)
      this.container.removeChild(sprite);
  }

  private elapsed = 0;
  private updateSprites(dt: number) {
    this.elapsed += dt;
    for (const sprite of this.container.children)
      (sprite as TextureSprite).update(this.elapsed);
  }

  private render() {
    const { offset: [x, y], viewWidth: w, viewHeight: h } = this.game.view.camera;
    const r = Math.ceil(Math.sqrt(w * w + h * h));

    let minX: number = Number.MAX_VALUE, minY: number = Number.MAX_VALUE;
    for (const sprite of this.sprites.values()) {
      const { x, y } = (sprite.transform as TransformStatic).position;
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
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