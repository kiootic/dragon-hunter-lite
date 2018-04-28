import { TextureSprite } from 'app/components';
import { Game } from 'app/game';
import { ItemSlot } from 'common/data';
import { Container, DisplayObject, Sprite, Texture } from 'pixi.js';

export class SlotView extends Container {
  public static Size = 64;

  private bg = new Sprite(Texture.fromFrame('sprites/ui/inv-slot'));
  private obj?: TextureSprite;
  private dragging = false;

  constructor(private readonly game: Game) {
    super();
    this.bg.scale.set(2, 2);
    this.addChild(this.bg);
    this.width = SlotView.Size;
    this.height = SlotView.Size;
  }

  public setSlot(slot: ItemSlot) {
    if (this.obj)
      this.removeChild(this.obj);

    if (!slot.item) {
      this.obj = undefined;
      return;
    }

    const obj = new TextureSprite();
    obj.setTexture(slot.item.texture);
    obj.scale.set(2, 2);
    obj.anchor.set(0.5, 0.5);
    obj.outline = true;
    this.addChild(obj);
    this.obj = obj;

    this.interactive = true;
    this.on('pointerdown', () => {
      if (this.obj && !this.dragging) {
        this.dragging = true;
        this.game.app.dragDrop.begin(this.obj).then(this.endDrag);
      }
    });
    this.layout();
  }

  public layout() {
    if (this.obj) {
      if (!this.dragging) {
        this.obj.position.set(this.width / 2, this.height / 2);
      }
    }
  }

  public update(dt: number) {
    this.obj && this.obj.update(dt);
  }

  private endDrag = (obj: DisplayObject) => {

  }
}