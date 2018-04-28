import { TextureSprite } from 'app/components';
import { Item } from 'common/data';
import { Container, Sprite, Texture } from 'pixi.js';

export class SlotView extends Container {
  public static Size = 64;

  private bg = new Sprite(Texture.fromFrame('sprites/ui/inv-slot'));
  private obj?: TextureSprite;

  constructor() {
    super();
    this.bg.scale.set(2, 2);
    this.addChild(this.bg);
    this.width = SlotView.Size;
    this.height = SlotView.Size;
  }

  public setItem(items: (Item | null)[], index: number): void;
  public setItem<T, _K extends keyof T, K extends T[_K] extends (Item | null) ? _K : never>(items: T, index: K): void;
  public setItem(items: any, index: string | number) {
    if (this.obj)
      this.removeChild(this.obj);

    const item = items[index];
    if (!items[index]) {
      this.obj = undefined;
      return;
    }

    const obj = new TextureSprite();
    obj.setTexture(item.texture);
    obj.scale.set(2, 2);
    obj.outline = true;
    this.addChild(obj);
    this.obj = obj;
  }

  public layout() {
    if (this.obj) {
      const { width, height } = this.obj;
      this.obj.position.set((this.width - width) / 2, (this.height - height) / 2);
    }
  }

  public update(dt: number) {
    this.obj && this.obj.update(dt);
  }
}