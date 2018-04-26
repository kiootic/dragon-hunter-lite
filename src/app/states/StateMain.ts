import { Game } from 'app/game';
import { GameState } from 'app/states/GameState';
import { fadeIn } from 'app/utils/animations';
import { GameSave } from 'common/data';

export class StateMain extends GameState {
  public get name() { return 'main'; }

  private readonly game: Game;

  constructor(gameSave: GameSave) {
    super();
    this.game = new Game(gameSave);
    this.root.addChild(this.game.view);
  }

  enter() {
    this.game.init();
    this.root.alpha = 0;
    fadeIn(this.root).subscribe();
  }

  update(dt: number) {
    this.game.update(dt);
  }

  layout() {
    this.game.layout();
  }

  leave() {
    this.game.dispose();
  }
}