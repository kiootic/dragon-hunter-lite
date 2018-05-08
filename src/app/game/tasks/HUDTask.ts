import { Game } from 'app/game';
import * as hud from 'app/game/hud';
import { Task } from 'app/game/tasks';

const HUDElements: hud.HUDElementType[] = [
  hud.Console,
  hud.Hotbar,
  hud.Status,
  hud.MiniMap,
];

export class HUDTask extends Task {
  public readonly runWhenPaused = true;
  private readonly elements: hud.HUDElement[] = [];

  constructor(game: Game) {
    super(game);
    for (const HUDElement of HUDElements) {
      const elem = new HUDElement(game);
      if (elem.display)
        game.view.add(elem.display);
      this.elements.push(elem);
    }
  }

  update(dt: number) {
    for (const elem of this.elements)
      elem.update(dt);
  }

  dispose() {
    for (const elem of this.elements)
      elem.dispose && elem.dispose();
  }
}