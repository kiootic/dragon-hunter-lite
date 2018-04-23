import { Container, loaders, Sprite, Texture } from 'pixi.js';
import { App } from 'app';
import { GameState } from 'app/states/GameState';
import { fadeOut, fadeIn } from 'app/utils/animations';
import { Game } from 'app/game';
import { TileMap } from 'app/game/map';
import { GameSave } from 'common/data';

export class StateMain extends GameState {
  public get name() { return 'main'; }

  private readonly game: Game;

  constructor(private readonly gameSave: GameSave) {
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

  leave() {
    this.game.dispose();
  }
}