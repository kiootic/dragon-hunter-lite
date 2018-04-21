import { Sprite, Texture } from 'pixi.js';
import { TextureDef } from 'app/data/TextureDef';

function hashKey(key: number) {
  // https://stackoverflow.com/a/12996028
  key = ((key >> 16) ^ key) * 0x45d9f3b;
  key = ((key >> 16) ^ key) * 0x45d9f3b;
  key = (key >> 16) ^ key;
  return key;
}

export class TextureSprite extends Sprite {
  constructor(textureDef: TextureDef, key: number) {
    key = hashKey(key);
    if (typeof textureDef === 'string') {
      super(Texture.fromFrame(textureDef));
    } else if (textureDef.type === 'random') {
      super(Texture.fromFrame(textureDef.texs[key % textureDef.texs.length]));
      if (textureDef.tint)
        this.tint = parseInt(textureDef.tint, 16);
    }
  }
}