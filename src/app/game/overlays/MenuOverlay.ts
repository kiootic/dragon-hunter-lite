import { App } from 'app';
import { TextButton } from 'app/components';
import { Game } from 'app/game';
import { GameOverlay } from 'app/game/overlays';
import * as vex from 'vex-js';

const MenuWidth = 400;
const MenuHeight = 500;

export class MenuOverlay extends GameOverlay {
  private saveButton = new TextButton('save');
  private exitButton = new TextButton('exit');

  constructor(game: Game) {
    super(game);
    this.content.addChild(this.saveButton);
    this.content.addChild(this.exitButton);
    this.saveButton.on(TextButton.Clicked, this.save.bind(this));
    this.exitButton.on(TextButton.Clicked, this.exit.bind(this));
  }

  layout(width: number, height: number) {
    this.position.set(
      (width - MenuWidth) / 2,
      (height - MenuHeight) / 2
    );
    super.layout(MenuWidth, MenuHeight);

    this.saveButton.position.set(32, 32);
    this.saveButton.layout(this.contentWidth - 64, 64);
    this.exitButton.position.set(32, this.saveButton.y + 96);
    this.exitButton.layout(this.contentWidth - 64, 64);
  }

  update(dt: number) {
    if (this.game.keyboard.isDown('Escape')) this.done();
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