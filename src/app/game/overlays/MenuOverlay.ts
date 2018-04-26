import { App } from 'app';
import { TextButton } from 'app/components';
import { Game } from 'app/game/Game';
import { GameOverlay } from 'app/game/GameOverlay';

const MenuWidth = 400;
const MenuHeight = 500;

export class MenuOverlay extends GameOverlay {
  private saveButton = new TextButton('save');
  private exitButton = new TextButton('exit');

  constructor(game: Game) {
    super(game);
    this.content.addChild(this.saveButton);
    this.content.addChild(this.exitButton);
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

  private async exit() {
    await this.done();
    await App.instance.popState();
  }
}