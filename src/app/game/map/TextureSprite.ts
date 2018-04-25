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
  public animName: string = '';
  public still: boolean = true;

  private overlay?: TextureSprite;
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
        case 'composite':
          this.setTexture(textureDef.base, key);
          this.overlay = new TextureSprite();
          this.overlay.anchor.copy(this.anchor);
          this.overlay.setTexture(textureDef.overlay, key);
          this.addChild(this.overlay);
          break;
        case 'animation':
          this.frame = -1;
          this.elapsed = 0;
          this.texture = Texture.EMPTY;
          break;
      }
    }
  }

  private frame = -1;
  private elapsed = 0;
  public update(dt: number) {
    if (
      !this.textureDef || this.textureDef.type !== 'animation' ||
      !(this.animName in this.textureDef.anims)
    )
      return;

    const animation = this.textureDef.anims[this.animName];
    if (this.still) {
      this.frame = -1;
      this.elapsed = 0;
    } else {
      const frameDuration = 1000 / animation.fps;
      this.elapsed += dt;
      while (this.elapsed > frameDuration) {
        this.frame++;
        this.elapsed -= frameDuration;
      }
      this.frame = this.frame % animation.numFrames;
    }
    this.texture = Texture.fromFrame(`${animation.frameId}-${this.frame + 1}`);
  }

  _onAnchorUpdate() {
    (Sprite.prototype as any)._onAnchorUpdate.call(this);
    this.overlay && this.overlay.anchor.copy(this._anchor);
  }
}