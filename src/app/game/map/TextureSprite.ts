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
  public shader?: Filter<any> | null;

  public setTexture(textureDef: TextureDef, key: number) {
    key = hashKey(key);
    this.tint = 0xffffff;

    if (typeof textureDef === 'string') {
      this.texture = Texture.fromFrame(textureDef);
    } else if (textureDef.type === 'single') {
      this.texture = Texture.fromFrame(textureDef.tex);
      if (textureDef.tint)
        this.tint = parseInt(textureDef.tint, 16);
    } else if (textureDef.type === 'random') {
      this.texture = Texture.fromFrame(textureDef.texs[key % textureDef.texs.length]);
      if (textureDef.tint)
        this.tint = parseInt(textureDef.tint, 16);
    }
  }
}