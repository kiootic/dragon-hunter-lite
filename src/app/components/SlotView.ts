import { TextureSprite } from 'app/components';
import { ItemToolTip } from 'app/components/ItemToolTip';
import { Game } from 'app/game';
import { InventorySwap } from 'app/game/messages';
import { ItemSlot } from 'common/data';
import { Container, DisplayObject } from 'pixi.js';

export class SlotView extends Container {
  public static Size = 56;

  private readonly bg = new TextureSprite();
  public readonly bgOverlay = new TextureSprite();
  public readonly fgOverlay = new TextureSprite();

  private readonly obj: TextureSprite;
  private dragging = false;

  public enabled = true;
  public showTooltip = true;
  public alwaysInteractive = false;
  public get empty() { return !this.slot.item; }

  constructor(private readonly game: Game, public readonly slot: ItemSlot) {
    super();

    this.bg.setTexture('sprites/ui/inv-slot');
    this.addChild(this.bg);
    this.addChild(this.bgOverlay);

    this.obj = new TextureSprite();
    this.obj.scale.set(2, 2);
    this.obj.anchor.set(0.5, 0.5);
    this.obj.outline = true;
    this.addChild(this.obj);
    this.addChild(this.fgOverlay);

    let toolTip: ItemToolTip;
    this.interactive = true;

    this.game.app.toolTip.add(this, () => {
      if (this.slot.item && this.showTooltip) {
        if (!toolTip) toolTip = new ItemToolTip(this.game.app, this.slot.item);
        else toolTip.setItem(this.slot.item);
        return toolTip;
      } else
        return null;
    });

    this.on('pointerdown', () => {
      if (this.enabled && this.slot.item && !this.game.app.dragDrop.active) {
        this.dragging = true;
        this.game.app.dragDrop.begin(this.obj).then(this.endDrag);
        if (toolTip)
          this.game.app.toolTip.hide(toolTip);
      }
    });
  }

  public updateSlot() {
    if (this.slot.item) {
      this.obj.setTexture(this.slot.item.texture);
      this.obj.alpha = 1;
      this.buttonMode = true || this.alwaysInteractive;
    } else {
      this.obj.clearTexture();
      this.obj.alpha = 0;
      this.buttonMode = false || this.alwaysInteractive;
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
    if (target instanceof SlotView && target !== this && this.enabled && target.enabled) {
      this.game.dispatch(new InventorySwap(this.slot, target.slot));
    }
  }
}