import { Container, loaders, Sprite, Texture } from 'pixi.js';
import { App } from 'app';
import { GameState } from 'app/states/GameState';
import { fadeOut, fadeIn } from 'app/utils/animations';
import { Game } from 'app/game/Game';

export class StateMain extends GameState {
  public get name() { return 'main'; }

  private readonly game: Game;

  constructor() {
    super();
    this.game = new Game();
    this.root.addChild(this.game.view);

    this.root.alpha = 0;
    fadeIn(this.root).subscribe();
  }

  update(dt: number) {
    this.game.update(dt);
  }
}