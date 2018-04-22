import { Sprite, Texture, Filter } from 'pixi.js';
import { TextureDef } from 'app/data/TextureDef';

function hashKey(key: number) {
  // https://stackoverflow.com/a/12996028
  key = ((key >> 16) ^ key) * 0x45d9f3b;
  key = ((key >> 16) ^ key) * 0x45d9f3b;
  key = (key >> 16) ^ key;
  return key;
}

export class TextureSprite extends Sprite {
  private overlay?: TextureSprite;

  public setTexture(textureDef: TextureDef, key: number) {
    key = hashKey(key);
    this.tint = 0xffffff;
    this.removeChildren();
    this.overlay = undefined;

    if (typeof textureDef === 'string') {
      this.texture = Texture.fromFrame(textureDef);
    } else {
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
      }
    }
  }

  _onAnchorUpdate() {
    (Sprite.prototype as any)._onAnchorUpdate.call(this);

    this.overlay && this.overlay.anchor.copy(this._anchor);
  }
}