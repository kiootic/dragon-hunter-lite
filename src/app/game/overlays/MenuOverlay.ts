import { App } from 'app';
import { SlotView, TextButton } from 'app/components';
import { Game } from 'app/game';
import { GameOverlay } from 'app/game/overlays';
import { Inventory } from 'app/game/traits';
import * as vex from 'vex-js';

const MenuWidth = 800;
const MenuHeight = 600;
const SlotsPerRow = 10;

export class MenuOverlay extends GameOverlay {
  private readonly saveButton = new TextButton('save');
  private readonly exitButton = new TextButton('exit');
  private readonly slots: SlotView[] = [];

  constructor(game: Game) {
    super(game);

    const items = game.player.traits.get(Inventory).content;
    for (const item of items) {
      const slot = new SlotView();
      slot.setItem(item);
      this.slots.push(slot);
      this.content.addChild(slot);
    }

    this.content.addChild(this.saveButton);
    this.content.addChild(this.exitButton);
    this.saveButton.on(TextButton.Clicked, this.save.bind(this));
    this.exitButton.on(TextButton.Clicked, this.exit.bind(this));
  }

  layout(width: number, height: number) {
    this.position.set(
      Math.round((width - MenuWidth) / 2),
      Math.round((height - MenuHeight) / 2)
    );
    super.layout(MenuWidth, MenuHeight);

    this.saveButton.position.set(this.contentWidth - 24 - 96, 24);
    this.saveButton.layout(96, 48);
    this.exitButton.position.set(this.contentWidth - 24 - 96, this.saveButton.y + 64);
    this.exitButton.layout(96, 48);

    const slotLeft = 24, slotTop = 176;
    let x = 0, y = 0;
    for (const slot of this.slots) {
      slot.position.set(slotLeft + x * slot.width, slotTop + y * slot.height + (y > 0 ? 16 : 0));
      slot.layout();
      if (++x === SlotsPerRow) {
        x = 0;
        y++;
      }
    }
  }

  update(dt: number) {
    if (this.game.keyboard.isDown('Escape')) this.done();
    for (const slot of this.slots)
      slot.update(dt);
  }

  private save() {
    this.game.save();
    vex.dialog.prompt({
      label: 'Save name (max 8 char.): ',
      value: this.game.data.id,
      callback: (name) => {
        if (name === false) return;

        if (!name) {
          vex.dialog.alert('Name is empty!');
          return;
        } else if (name.length > 8) {
          vex.dialog.alert('Name is too long!');
          return;
        }
        this.game.data.id = name;
        localStorage[name] = this.game.data.export();
        vex.dialog.alert(`Saved as name '${name}'.`);
      }
    });
  }

  private async exit() {
    await this.done();
    await App.instance.popState();
  }
}