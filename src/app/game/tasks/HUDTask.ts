import { Game } from 'app/game';
import { HUDElement, HUDElementType, MiniMap } from 'app/game/hud';
import { Task } from 'app/game/tasks';

const HUDElements: HUDElementType[] = [
  MiniMap
];

export class HUDTask extends Task {
  private readonly elements: HUDElement[] = [];

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
}