import { GameView } from "app/game/GameView";
import { App } from "app";

export class Game {
  public readonly view = new GameView(this);

  public update(dt: number) {
    const { width, height } = App.instance.screen;
    this.view.layout(width, height);
  }
}