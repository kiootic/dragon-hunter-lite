import { GameOverlay } from 'app/game/GameOverlay';

const menuWidth = 300;
const menuHeight = 600;

export class MenuOverlay extends GameOverlay {
  layout(width: number, height: number) {
    this.position.set(
      (width - menuWidth) / 2,
      (height - menuHeight) / 2
    );
    super.layout(menuWidth, menuHeight);
  }

  update(dt: number) {
    if (this.game.keyboard.isDown('Escape')) this.done();
  }
}