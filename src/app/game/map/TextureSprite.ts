import { MapSprite, MapSpriteRenderer } from 'app/game/map/MapSpriteRenderer';
import { TextureDef } from 'common/data';
import { Sprite, Texture } from 'pixi.js';

function hashKey(key: number) {
  // https://stackoverflow.com/a/12996028
  key = ((key >> 16) ^ key) * 0x45d9f3b;
  key = ((key >> 16) ^ key) * 0x45d9f3b;
  key = (key >> 16) ^ key;
  return key;
}

export class TextureSprite extends Sprite implements MapSprite {
  public outline: boolean = false;
  public offset?: [number, number];

  public animName: string = '';
  public still: boolean = true;

  private overlay?: Sprite;
  private textureDef?: Exclude<TextureDef, string>;

  public setTexture(textureDef: TextureDef, key: number) {
    key = hashKey(key);

    this.tint = 0xffffff;
    this.removeChildren();
    this.overlay = undefined;
    this.pluginName = MapSpriteRenderer.Name;

    if (typeof textureDef === 'string') {
      this.textureDef = undefined;
      this.texture = Texture.fromFrame(textureDef);
    } else {
      this.textureDef = textureDef;
      switch (textureDef.type) {
        case 'single':
          this.texture = Texture.fromFrame(textureDef.tex);
          if (textureDef.tint) this.tint = parseInt(textureDef.tint, 16);
          break;
        case 'random':
          this.texture = Texture.fromFrame(textureDef.texs[key % textureDef.texs.length]);
          if (textureDef.tint) this.tint = parseInt(textureDef.tint, 16);
          break;
        case 'composite': {
          this.setTexture(textureDef.base, key);
          const overlay = new TextureSprite();
          overlay.anchor.copy(this.anchor);
          overlay.setTexture(textureDef.overlay, key);
          this.overlay = overlay;
          this.addChild(overlay);
        } break;
        case 'animation':
          this.frame = -1;
          this.texture = Texture.EMPTY;
          break;
        case 'liquid':
          this.texture = Texture.fromFrame(textureDef.tex);
          if (textureDef.tint) this.tint = parseInt(textureDef.tint, 16);
      }
    }
  }

  private frame = -1;
  public update(elapsed: number) {
    if (!this.textureDef)
      return;

    if (this.textureDef.type === 'animation' && this.animName in this.textureDef.anims) {
      const animation = this.textureDef.anims[this.animName];
      if (this.still) {
        this.frame = -1;
      } else {
        const frameDuration = 1000 / animation.fps;
        this.frame = Math.floor(elapsed / frameDuration) % animation.numFrames;
      }
      this.texture = Texture.fromFrame(`${animation.frameId}-${this.frame + 1}`);
    } else if (this.textureDef.type === 'liquid') {
      let d = (elapsed % this.textureDef.time) / this.textureDef.time;
      d = Math.sin(d * Math.PI * 2);
      const offset = this.textureDef.offset * d;
      this.offset = [offset, offset];
    }
  }

  _onAnchorUpdate() {
    (Sprite.prototype as any)._onAnchorUpdate.call(this);
    this.overlay && this.overlay.anchor.copy(this._anchor);
  }
}