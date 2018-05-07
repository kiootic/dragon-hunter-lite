import { Button, SlotView, TextureSprite } from 'app/components';
import { Game } from 'app/game';
import { ItemDrop } from 'app/game/entities';
import { MenuPanel } from 'app/game/menu';
import { InventoryUpdated } from 'app/game/messages';
import { Item } from 'common/data';
import { mixSolution } from 'common/logic/alchemy';
import { Texture } from 'pixi.js';
import { Subscription } from 'rxjs/Subscription';

export class Alchemy extends MenuPanel {
  readonly name = 'Alchemy';
  readonly icon = Texture.fromFrame('sprites/ui/tab-alchemy');

  private readonly processButton = new Button();
  private readonly input1: SlotView;
  private readonly input2: SlotView;
  private readonly fuel: SlotView;
  private readonly output: SlotView;
  private readonly bg: TextureSprite;
  private readonly subscription = new Subscription();

  constructor(private readonly game: Game) {
    super();

    this.bg = new TextureSprite(Texture.from('sprites/ui/cauldron'));
    this.bg.outline = true;
    this.bg.scale.set(7, 7);
    this.addChild(this.bg);

    const icon = new TextureSprite(Texture.fromFrame('sprites/ui/arrow-compact'));
    icon.scale.set(2, 2);
    icon.rotation = -Math.PI / 2;
    icon.pivot.set(8, 8);
    icon.position.set(18, 20);
    this.processButton.content.addChild(icon);
    this.addChild(this.processButton);

    this.input1 = new SlotView(game, { accepts: [Item.Type.Consumable], item: null });
    this.input2 = new SlotView(game, { accepts: [Item.Type.Consumable], item: null });
    this.fuel = new SlotView(game, { accepts: '^wood-', item: null });
    this.output = new SlotView(game, { accepts: [], item: null });
    this.addChild(this.input1);
    this.addChild(this.input2);
    this.addChild(this.fuel);
    this.addChild(this.output);
    this.fuel.bgOverlay.setTexture('sprites/ui/inv-slot-fire');

    this.subscription.add(game.messages$.ofType(InventoryUpdated).subscribe(this.checkInventory));
    this.checkInventory();

    this.processButton.on(Button.Clicked, this.doAlchemy);
  }

  private checkInventory = () => {
    this.processButton.isEnabled =
      !this.input1.empty && !this.input2.empty && !this.fuel.empty && this.output.empty;
  }

  private doAlchemy = () => {
    const input1 = this.input1.slot.item!;
    const input2 = this.input2.slot.item!;
    const output = mixSolution(input1, input2, this.game.library.elements);

    this.output.slot.item = output;
    this.input1.slot.item = null;
    this.input2.slot.item = null;
    this.fuel.slot.item = null;
    this.game.dispatch(new InventoryUpdated(this.input1.slot));
    this.game.dispatch(new InventoryUpdated(this.input2.slot));
    this.game.dispatch(new InventoryUpdated(this.output.slot));
    this.game.dispatch(new InventoryUpdated(this.fuel.slot));
  }

  layout(width: number, height: number) {
    const contentWidth = SlotView.Size + 16 + 40 + 16 + SlotView.Size;
    this.input1.position.set(16, 4);
    this.input1.layout();

    this.processButton.position.set(16 + SlotView.Size + 16, 16);
    this.processButton.layout(40, 40);

    this.input2.position.set(16 + SlotView.Size + 16 + 40 + 16, 4);
    this.input2.layout();

    this.bg.position.set(16 + (contentWidth - this.bg.width) / 2, SlotView.Size + 8);

    this.output.position.set(16 + (contentWidth - SlotView.Size) / 2, SlotView.Size + 28);
    this.output.layout();

    this.fuel.position.set(16 + (contentWidth - SlotView.Size) / 2, 192);
    this.fuel.layout();
  }

  dispose(exit: boolean) {
    if (exit) this.subscription.unsubscribe();
    for (const { slot } of [this.input1, this.input2, this.fuel, this.output])
      if (slot.item) {
        const drop = ItemDrop.make(this.game, slot.item);
        this.game.entities.add(drop);
        slot.item = null;
        this.game.dispatch(new InventoryUpdated(slot));
      }
  }
}