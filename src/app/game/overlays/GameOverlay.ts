import { Panel } from 'app/components';
import { Game } from 'app/game';

export class GameOverlay extends Panel {
  constructor(public readonly game: Game) {
    super(game.app);
  }

  public init() { }
  public dispose() { }
  public update(dt: number) { }

  protected async done() {
    await this.game.app.popState();
  }
}