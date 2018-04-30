import { TextureSprite } from 'app/components';
import { Game } from 'app/game';
import { InventorySwap } from 'app/game/messages';
import { ItemSlot } from 'common/data';
import { Container, DisplayObject } from 'pixi.js';

export class SlotView extends Container {
  public static Size = 56;

  private readonly bg = new TextureSprite();
  public readonly overlay = new TextureSprite();

  private readonly obj: TextureSprite;
  private dragging = false;

  constructor(private readonly game: Game, public readonly slot: ItemSlot) {
    super();

    this.bg.setTexture('sprites/ui/inv-slot');
    this.addChild(this.bg);
    this.addChild(this.overlay);

    this.obj = new TextureSprite();
    this.obj.scale.set(2, 2);
    this.obj.anchor.set(0.5, 0.5);
    this.obj.outline = true;
    this.addChild(this.obj);

    this.interactive = true;
    this.on('pointerdown', () => {
      if (this.slot.item && !this.game.app.dragDrop.active) {
        this.dragging = true;
        this.game.app.dragDrop.begin(this.obj).then(this.endDrag);
      }
    });
  }

  public updateSlot() {
    if (this.slot.item) {
      this.obj.setTexture(this.slot.item.texture);
      this.obj.alpha = 1;
      this.buttonMode = true;
    } else {
      this.obj.clearTexture();
      this.obj.alpha = 0;
      this.buttonMode = false;
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