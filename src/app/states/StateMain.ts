import { Game } from 'app/game';
import { GameState } from 'app/states/GameState';
import { fadeIn, fadeOut } from 'app/utils/animations';
import { GameSave } from 'common/data';

export class StateMain extends GameState {
  public get name() { return 'main'; }

  private readonly game: Game;

  constructor(gameSave: GameSave) {
    super();
    this.game = new Game(gameSave);
    this.root.addChild(this.game.view);
  }

  async enter() {
    this.game.init();
    this.root.alpha = 0;
    await fadeIn(this.root).toPromise();
  }

  update(dt: number) {
    this.game.update(dt);
  }

  layout() {
    this.game.layout();
  }

  async leave() {
    this.game.dispose();
    this.root.alpha = 1;
    await fadeOut(this.root).toPromise();
  }
}