import { TextureSprite } from 'app/components';
import { Game } from 'app/game';
import { InventorySwap } from 'app/game/messages';
import { Item, ItemSlot } from 'common/data';
import { Container, DisplayObject } from 'pixi.js';

export class SlotView extends Container {
  public static Size = 64;

  private readonly bg = new TextureSprite();

  private readonly obj: TextureSprite;
  private dragging = false;

  constructor(private readonly game: Game, private readonly slot: ItemSlot) {
    super();
    if (!slot.accepts || slot.accepts.length !== 1) {
      this.bg.setTexture('sprites/ui/inv-slot');
    } else {
      let overlay = '';
      switch (slot.accepts[0]) {
        case Item.Type.Chestplate: overlay = 'sprites/ui/inv-slot-chestplates'; break;
        case Item.Type.Leggings: overlay = 'sprites/ui/inv-slot-leggings'; break;
        case Item.Type.Boots: overlay = 'sprites/ui/inv-slot-boots'; break;
        case Item.Type.Weapon: overlay = 'sprites/ui/inv-slot-weapons'; break;
      }
      this.bg.setTexture(overlay ? {
        type: 'composite',
        base: 'sprites/ui/inv-slot',
        overlay
      } : 'sprites/ui/inv-slot');
    }
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