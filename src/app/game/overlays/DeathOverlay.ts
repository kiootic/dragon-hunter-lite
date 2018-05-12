import { Text, TextButton } from 'app/components';
import { Game } from 'app/game';
import { GameOverlay } from 'app/game/overlays';

const Width = 400;
const Height = 200;

export class DeathOverlay extends GameOverlay {
  private readonly exitButton: TextButton;
  private readonly message: Text;

  constructor(game: Game) {
    super(game);

    this.message = new Text('you died!', { fontWeight: 'bold' });
    this.addChild(this.message);

    this.exitButton = new TextButton('exit');
    this.exitButton.position.set((Width - 128) / 2, Height - 16 - 48);
    this.exitButton.on(TextButton.Clicked, this.exit);
    this.addChild(this.exitButton);
  }

  layout(width: number, height: number) {
    this.position.set(
      Math.round((width - Width) / 2),
      Math.round((height - Height) / 2)
    );
    super.layout(Width, Height);

    this.message.layout(Width, 128);
    this.exitButton.layout(128, 48);
  }

  private exit = async () => {
    await this.done();
    await this.game.app.popState();
  }
}