import { SlotView } from 'app/components';
import { Game } from 'app/game';
import { HUDElement } from 'app/game/hud';
import { Inventory, PlayerData } from 'app/game/traits';
import { Item, ItemSlot, Weapon } from 'common/data';
import { Container, Sprite, Texture } from 'pixi.js';

const HotbarOpacity = 0.75;
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
    this.slots = game.player.traits.get(Inventory).slots.slice(0, 8);
    this.player = game.player.traits.get(PlayerData);

    this.bg.tint = 0x404040;

    const views = new Container();
    views.addChild(this.bg);

    this.slotViews = this.slots.map(slot => new SlotView(game, slot));
    for (const view of this.slotViews) {
      view.enabled = false;
      view.toolTipOpacity = 0.9;
      view.alwaysInteractive = true;

      view.bgOverlay.texture = Texture.WHITE;
      view.bgOverlay.width = 48;
      view.bgOverlay.height = 0;
      view.bgOverlay.alpha = 0.2;
      view.bgOverlay.anchor.set(0, 1);
      view.bgOverlay.position.set(4, 52);

      views.addChild(view);
      view.on('pointerdown', () => this.player.hotbarSelection = this.slots.indexOf(view.slot));
    }

    this.addChild(views);
    this.addChild(this.selection);

    views.alpha = HotbarOpacity;
    this.interactive = true;
    this.on('pointerover', () => views.alpha = 1);
    this.on('pointerout', () => views.alpha = HotbarOpacity);

    game.app.view.addEventListener('wheel', this.wheelSelection);
  }

  private wheelDebounce = 0;
  private wheelSelection = (event: WheelEvent) => {
    if (this.game.paused) return;
    if (this.elapsed - this.wheelDebounce < 20) return;

    const delta = event.deltaX + event.deltaY;
    if (Math.abs(delta) < 32) return;

    const offset = Math.sign(delta);
    const numSlots = this.slots.length;
    this.player.hotbarSelection = (this.player.hotbarSelection + offset + numSlots) % numSlots;
    this.wheelDebounce = this.elapsed;
  }

  dispose() {
    this.game.app.view.removeEventListener('wheel', this.wheelSelection);
  }

  private elapsed = 0;
  private maxConsumeCooldown = 0;
  private maxAttackCooldown = 0;
  private lastConsumeCooldown = 0;
  private lastAttackCooldown = 0;
  update(dt: number) {
    for (const [slotNum, key] of HotbarKeys) {
      if (this.game.keyboard.isDown(key))
        this.player.hotbarSelection = slotNum;
    }
    this.elapsed += dt;

    if (this.player.consumeCooldown > this.lastConsumeCooldown)
      this.maxConsumeCooldown = this.player.consumeCooldown;
    this.lastConsumeCooldown = this.player.consumeCooldown;

    if (this.player.attackCooldown > this.lastAttackCooldown)
      this.maxAttackCooldown = this.player.attackCooldown;
    this.lastAttackCooldown = this.player.attackCooldown;

    const consumeCooldownHeight = 48 * (this.player.consumeCooldown / this.maxConsumeCooldown);
    const attackCooldownHeight = 48 * (this.player.attackCooldown / this.maxAttackCooldown);

    for (const { slot, bgOverlay } of this.slotViews) {
      if (slot.item && slot.item.weapon && slot.item.weapon.type !== Weapon.Type.Arrow)
        bgOverlay.height = attackCooldownHeight;
      else if (slot.item && slot.item.type === Item.Type.Consumable)
        bgOverlay.height = consumeCooldownHeight;
      else
        bgOverlay.height = 0;
    }
  }

  layout(width: number, height: number) {
    const contentWidth = 8 + (SlotView.Size + 4) * this.slotViews.length;
    const contentHeight = SlotView.Size + 12;
    this.position.set(
      Math.round((width - contentWidth) / 2),
      height - contentHeight
    );

    let x = 6;
    for (const view of this.slotViews) {
      view.position.set(x, 6);
      view.layout();
      x += SlotView.Size + 4;
    }
    this.selection.position.set(3 + (SlotView.Size + 4) * this.player.hotbarSelection, 3);

    this.bg.position.set(0, 0);
    this.bg.width = contentWidth;
    this.bg.height = contentHeight;
  }
}