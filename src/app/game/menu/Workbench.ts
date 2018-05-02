import { Button, SlotView, TextureSprite } from 'app/components';
import { Game } from 'app/game';
import { MenuPanel } from 'app/game/menu';
import { InventoryUpdated } from 'app/game/messages';
import { Inventory } from 'app/game/traits';
import { ItemSlot, Recipe } from 'common/data';
import { clamp, cloneDeep } from 'lodash';
import { Container, Texture } from 'pixi.js';
import { Subscription } from 'rxjs/Subscription';

const NumRows = 3;

class RecipeView extends Container {
  readonly output: SlotView;

  private makeOutput() {
    return cloneDeep(this.recipe.output);
  }

  constructor(private readonly game: Game, private readonly recipe: Recipe) {
    super();
    this.output = new SlotView(game, { accepts: [], item: this.makeOutput() });
    this.output.position.set(0, (64 - SlotView.Size) / 2);
    this.addChild(this.output);

    const arrow = new TextureSprite(Texture.fromFrame('sprites/ui/arrow'));
    arrow.position.set(SlotView.Size + 16, 0);
    arrow.scale.set(2, 2);
    this.addChild(arrow);

    let x = SlotView.Size + 16 + 64 + 16;
    for (const { texture } of recipe.input) {
      const icon = new TextureSprite();
      icon.outline = true;
      icon.setTexture(texture);
      icon.scale.set(2, 2);
      icon.position.set(x + 8, 8);
      this.addChild(icon);
      x += 64;
    }
  }

  checkInput(inventory: ItemSlot[]) {
    const inputs = this.recipe.input.map(item => item.id);
    const slots: ItemSlot[] = [];
    for (const slot of inventory) {
      if (!slot.item) continue;
      const index = inputs.indexOf(slot.item.id);
      if (index < 0) continue;

      inputs.splice(index, 1);
      slots.push(slot);
    }
    return slots;
  }

  check(inventory: ItemSlot[]) {
    if (this.output.empty) {
      const inputSlots = this.checkInput(inventory);

      for (const slot of inputSlots)
        slot.item = null;
      this.output.slot.item = this.makeOutput();

      for (const slot of inputSlots)
        this.game.dispatch(new InventoryUpdated(slot));
    }

    const inputs = this.checkInput(inventory);
    const ok = inputs.length === this.recipe.input.length;
    this.output.enabled = ok;
    this.alpha = ok ? 1 : 0.5;
  }

  layout() {
    this.output.layout();
  }
}

export class Workbench extends MenuPanel {
  readonly name = 'Workbench';
  readonly icon = Texture.fromFrame('sprites/ui/tab-workbench');

  private readonly upButton = new Button();
  private readonly downButton = new Button();
  private readonly recipeViews: RecipeView[] = [];
  private readonly subscription = new Subscription();

  private scrollOffset = 0;

  constructor(private readonly game: Game) {
    super();

    this.upButton = new Button();
    const upIcon = new TextureSprite(Texture.fromFrame('sprites/ui/arrow-compact'));
    upIcon.scale.set(2, 2);
    upIcon.rotation = Math.PI / 2;
    upIcon.pivot.set(8, 8);
    upIcon.position.set(32, 16);
    this.upButton.content.addChild(upIcon);
    this.addChild(this.upButton);

    this.downButton = new Button();
    const downIcon = new TextureSprite(Texture.fromFrame('sprites/ui/arrow-compact'));
    downIcon.scale.set(2, 2);
    downIcon.rotation = -Math.PI / 2;
    downIcon.pivot.set(8, 8);
    downIcon.position.set(32, 16);
    this.downButton.content.addChild(downIcon);
    this.addChild(this.downButton);

    for (const recipe of game.library.recipes) {
      const view = new RecipeView(game, recipe);
      this.addChild(view);
      this.recipeViews.push(view);
    }

    this.subscription.add(game.messages$.ofType(InventoryUpdated).subscribe(this.checkInventory));
    this.checkInventory();

    this.upButton.on(Button.Clicked, () => this.scrollOffset--);
    this.downButton.on(Button.Clicked, () => this.scrollOffset++);
  }

  private checkInventory = () => {
    const inventory = this.game.player.traits(Inventory).slots;
    for (const view of this.recipeViews)
      view.check(inventory);
  }

  layout(width: number, height: number) {
    const scrollMin = 0, scrollMax = this.recipeViews.length - NumRows;
    this.scrollOffset = clamp(this.scrollOffset, 0, scrollMax);
    this.upButton.visible = this.scrollOffset > scrollMin;
    this.downButton.visible = this.scrollOffset < scrollMax;

    let y = 0;
    this.upButton.position.set(0, y);
    this.upButton.layout(64, 32);
    y += 32;

    for (let i = 0; i < this.recipeViews.length; i++) {
      const view = this.recipeViews[i];
      if (i < this.scrollOffset || i >= this.scrollOffset + NumRows) {
        view.visible = false;
      } else {
        view.visible = true;

        view.position.set(2, y);
        view.layout();
        y += 64;
      }
    }
    this.downButton.position.set(0, y);
    this.downButton.layout(64, 32);
  }

  dispose() {
    this.subscription.unsubscribe();
  }
}