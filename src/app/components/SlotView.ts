import { TextureSprite } from 'app/components';
import { Game } from 'app/game';
import { InventorySwap } from 'app/game/messages';
import { ItemSlot } from 'common/data';
import { Container, DisplayObject, Sprite, Texture } from 'pixi.js';

export class SlotView extends Container {
  public static Size = 64;

  private readonly bg = new Sprite(Texture.fromFrame('sprites/ui/inv-slot'));

  private readonly obj: TextureSprite;
  private dragging = false;

  constructor(private readonly game: Game, private readonly slot: ItemSlot) {
    super();
    this.bg.scale.set(2, 2);
    this.addChild(this.bg);

    this.obj = new TextureSprite();
    this.obj.scale.set(2, 2);
    this.obj.anchor.set(0.5, 0.5);
    this.obj.outline = true;
    this.addChild(this.obj);

    this.interactive = true;
    this.on('pointerdown', () => {
      if (this.obj && !this.dragging) {
        this.dragging = true;
        this.game.app.dragDrop.begin(this.obj).then(this.endDrag);
      }
    });
  }

  public updateSlot() {
    if (!this.slot.item && this.obj) {
      this.obj.alpha = 0;
    }
    if (this.slot.item) {
      this.obj.setTexture(this.slot.item.texture);
      this.obj.alpha = 1;
    } else {
      this.obj.clearTexture();
      this.obj.alpha = 0;
    }
  }

  public layout() {
    this.updateSlot();
    if (!this.dragging) {
      this.obj.position.set(SlotView.Size / 2, SlotView.Size / 2);
    }
  }

  public update(dt: number) {
    this.obj.update(dt);
  }

  private endDrag = (target: DisplayObject | null) => {
    this.dragging = false;
    this.addChild(this.obj);
    if (target instanceof SlotView && target !== this) {
      this.game.dispatch(new InventorySwap(this.slot, target.slot));
    }
  }
}