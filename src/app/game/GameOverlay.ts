import { App } from 'app';
import { Panel } from 'app/components';
import { Game } from 'app/game';

export class GameOverlay extends Panel {
  constructor(protected readonly game: Game) {
    super();
  }

  public init() { }
  public dispose() { }
  public update(dt: number) { }

  protected async done() {
    await App.instance.popState();
  }
}