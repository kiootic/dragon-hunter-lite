import { TextureSprite as TexSprite, TextureSpriteRenderer } from 'app/components/TextureSpriteRenderer';
import { TextureDef } from 'common/data';
import { Sprite, Texture } from 'pixi.js';

function hashKey(key: number) {
  // https://stackoverflow.com/a/12996028
  key = ((key >> 16) ^ key) * 0x45d9f3b;
  key = ((key >> 16) ^ key) * 0x45d9f3b;
  key = (key >> 16) ^ key;
  return key;
}

export class TextureSprite extends Sprite implements TexSprite {
  public outline: boolean = false;
  public offset?: [number, number];
  public renderTranslation?: [number, number];
  public clip?: [number, number];

  public animName: string = '';
  public still: boolean = true;

  private actionAnimName: string = '';
  private actionEndTime = -1;

  private overlay?: TextureSprite;
  private textureDef?: Exclude<TextureDef, string>;
  private currentTex = Texture.EMPTY;

  constructor(texture?: Texture) {
    super(texture);
    this.pluginName = TextureSpriteRenderer.Name;

    if (texture)
      this.currentTex = texture;
  }

  private updateTex() {
    let tex = this.currentTex;
    if (this.clip) {
      tex = tex.clone();
      const frame = tex.frame.clone();
      frame.width -= Math.round(this.clip[0] * frame.width);
      frame.height -= Math.round(this.clip[1] * frame.height);
      tex.frame = frame;
    }
    if (this._texture !== tex) {
      this.texture = tex;
    }
  }

  public clearTexture() {
    this.tint = 0xffffff;
    this.overlay && this.removeChild(this.overlay);
    this.overlay = undefined;
    this.currentTex = Texture.EMPTY;
    this.textureDef = undefined;
    this.offset = undefined;
    this.updateTex();
  }

  public setTexture(textureDef: TextureDef, key: number = 0) {
    key = hashKey(key);
    this.clearTexture();

    if (typeof textureDef === 'string') {
      this.textureDef = undefined;
      this.currentTex = Texture.fromFrame(textureDef);
    } else {
      this.textureDef = textureDef;
      switch (textureDef.type) {
        case 'single':
          this.currentTex = Texture.fromFrame(textureDef.tex);
          if (textureDef.tint) this.tint = parseInt(textureDef.tint, 16);
          break;
        case 'random':
          this.currentTex = Texture.fromFrame(textureDef.texs[key % textureDef.texs.length]);
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
          this.currentTex = Texture.EMPTY;
          break;
        case 'liquid':
          this.currentTex = Texture.fromFrame(textureDef.tex);
          if (textureDef.tint) this.tint = parseInt(textureDef.tint, 16);
      }
    }
    this.updateTex();
  }

  public playActionAnim(name: string) {
    if (!this.textureDef || this.textureDef.type !== 'animation' || !(name in this.textureDef.anims)) {
      console.log('animation: no such name: ' + name);
      return;
    }
    if (this.actionAnimName !== name) {
      const animation = this.textureDef.anims[name];
      this.frame = 0;
      this.actionAnimName = name;
      this.actionEndTime = this.elapsed + 1000 / animation.fps * animation.numFrames;
    }
  }

  public stopActionAnim(name: string) {
    if (this.actionAnimName === name) {
      this.frame = 0;
      this.actionAnimName = '';
      this.actionEndTime = -1;
    }
  }

  private frame = -1;
  private elapsed = 0;
  public update(elapsed: number) {
    this.elapsed = elapsed;
    if (this.textureDef) {
      if (this.textureDef.type === 'animation' && (this.animName || this.actionAnimName)) {
        const animation = this.textureDef.anims[this.actionAnimName || this.animName];
        if (animation) {
          if (this.still && !this.actionAnimName) {
            this.frame = -1;
          } else {
            const frameDuration = 1000 / animation.fps;
            this.frame = Math.floor(elapsed / frameDuration) % animation.numFrames;
          }
          this.currentTex = Texture.fromFrame(`${animation.frameId}-${this.frame + 1}`);
        } else {
          console.log('animation: no such name: ' + (this.actionAnimName || this.animName));
        }
        if (this.actionEndTime < elapsed) {
          this.actionAnimName = '';
          this.actionEndTime = -1;
        }
      } else if (this.textureDef.type === 'liquid') {
        let d = (elapsed % this.textureDef.time) / this.textureDef.time;
        d = Math.sin(d * Math.PI * 2);
        const offset = this.textureDef.offset * d;
        this.offset = [offset, offset];
      }
    }

    this.updateTex();

    if (this.overlay) {
      this.overlay.clip = this.clip;
      this.overlay.update(elapsed);
    }
  }

  _onAnchorUpdate() {
    (Sprite.prototype as any)._onAnchorUpdate.call(this);
    this.overlay && this.overlay.anchor.copy(this._anchor);
  }
}