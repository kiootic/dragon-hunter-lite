import { Button, SlotView, TextureSprite } from 'app/components';
import { Game } from 'app/game';
import { ItemDrop } from 'app/game/entities';
import { MenuPanel } from 'app/game/menu';
import { InventoryUpdated } from 'app/game/messages';
import { ItemSlot, Recipe } from 'common/data';
import { clamp, cloneDeep } from 'lodash';
import { Container, Texture } from 'pixi.js';
import { Subscription } from 'rxjs/Subscription';

const NumRows = 3;

class RecipeView extends Container {
  readonly arrow: TextureSprite;
  readonly output: SlotView;
  readonly inputs: SlotView[];

  private makeOutput() {
    return cloneDeep(this.recipe.output);
  }

  constructor(private readonly game: Game, private readonly recipe: Recipe) {
    super();

    this.output = new SlotView(game, { accepts: [], item: this.makeOutput() });
    this.output.position.set(0, (64 - SlotView.Size) / 2);
    this.addChild(this.output);

    this.inputs = recipe.input.map(({ accepts, texture }) => {
      const slot = new SlotView(game, { accepts, item: null });
      slot.bgOverlay.setTexture(texture);
      slot.bgOverlay.outline = true;
      return slot;
    });

    this.arrow = new TextureSprite(Texture.fromFrame('sprites/ui/arrow'));
    this.arrow.position.set(SlotView.Size + 16, 0);
    this.arrow.scale.set(2, 2);
    this.addChild(this.arrow);

    let x = SlotView.Size + 16 + 64 + 16;
    for (const input of this.inputs) {
      this.addChild(input);
      input.position.set(x + 8, 8);
      x += 64;
    }
  }

  check(slot?: ItemSlot) {
    let numInputs = 0;
    for (const input of this.inputs) {
      if (!input.slot.item) {
        input.alpha = 0.5;
      } else {
        input.alpha = 1;
        numInputs++;
      }
    }

    const ok = numInputs === this.recipe.input.length;
    this.output.enabled = ok;
    this.output.alpha = ok ? 1 : 0.5;
    this.arrow.alpha = ok ? 1 : 0.5;
    if (!this.output.slot.item) {
      this.output.slot.item = this.makeOutput();
      this.game.dispatch(new InventoryUpdated(this.output.slot));
      for (const { slot } of this.inputs) {
        slot.item = null;
        this.game.dispatch(new InventoryUpdated(slot));
      }
    }
  }

  layout() {
    this.output.layout();
    for (const input of this.inputs)
      input.layout();
  }

  dispose() {
    for (const { slot } of this.inputs)
      if (slot.item) {
        const drop = ItemDrop.make(this.game, slot.item);
        this.game.entities.add(drop);
        slot.item = null;
        this.game.dispatch(new InventoryUpdated(slot));
      }
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

  constructor(game: Game) {
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
    for (const view of this.recipeViews)
      view.check();

    this.upButton.on(Button.Clicked, () => this.scrollOffset--);
    this.downButton.on(Button.Clicked, () => this.scrollOffset++);
  }

  private checkInventory = ({ slot }: InventoryUpdated) => {
    for (const view of this.recipeViews)
      view.check(slot);
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

  dispose(exit: boolean) {
    if (exit) this.subscription.unsubscribe();
    for (const view of this.recipeViews)
      view.dispose();
  }
}