import { SlotView } from 'app/components';
import { Game } from 'app/game';
import { HUDElement } from 'app/game/hud';
import { Inventory, PlayerData } from 'app/game/traits';
import { ItemSlot } from 'common/data';
import { Container, Sprite, Texture } from 'pixi.js';

const HotbarKeys: [number, string][] = [
  [0, '1'],
  [1, '2'],
  [2, '3'],
  [3, '4'],
  [4, '5'],
  [5, '6'],
  [6, '7'],
  [7, '8'],
];

export class Hotbar extends Container implements HUDElement {
  public readonly display = this;

  private readonly bg = new Sprite(Texture.WHITE);
  private readonly selection = new Sprite(Texture.fromFrame('sprites/ui/inv-selection'));

  private readonly slots: ItemSlot[];
  private readonly player: PlayerData;
  private readonly slotViews: SlotView[];

  constructor(private readonly game: Game) {
    super();
    this.slots = game.player.traits(Inventory).slots.slice(0, 8);
    this.player = game.player.traits(PlayerData);

    this.bg.tint = 0x808080;
    this.addChild(this.bg);
    this.addChild(this.selection);

    this.slotViews = this.slots.map(slot => new SlotView(game, slot));
    for (const view of this.slotViews) {
      view.enabled = false;
      view.showTooltip = false;
      view.alwaysInteractive = true;
      this.addChild(view);
      view.on('pointerdown', () => this.player.hotbarSelection = this.slots.indexOf(view.slot));
    }

    this.alpha = 0.65;
  }

  update(dt: number) {
    for (const [slotNum, key] of HotbarKeys) {
      if (this.game.keyboard.isDown(key))
        this.player.hotbarSelection = slotNum;
    }
  }

  layout(width: number, height: number) {
    const contentWidth = 4 + (SlotView.Size + 4) * this.slotViews.length;
    const contentHeight = SlotView.Size + 7;
    this.position.set(
      (width - contentWidth) / 2,
      height - contentHeight
    );

    let x = 4;
    for (const view of this.slotViews) {
      view.position.set(x, 4);
      view.layout();
      x += SlotView.Size + 4;
    }
    this.selection.position.set((SlotView.Size + 4) * this.player.hotbarSelection, 0);

    this.bg.position.set(0, 0);
    this.bg.width = contentWidth;
    this.bg.height = contentHeight;
  }
}