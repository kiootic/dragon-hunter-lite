import { GameState } from 'app/states/GameState';
import { Container, Text } from 'pixi.js';
import { App } from 'app/App';

export class StatePreload extends GameState {
  public get name() { return 'preload'; }

  private loadingText = new Text('loading...', { fill: 'white', fontSize: 16, });
  constructor() {
    super();
    this.root.addChild(this.loadingText);
  }

  update() {
    this.loadingText.x = (App.instance.screen.width - this.loadingText.width) / 2;
    this.loadingText.y = (App.instance.screen.height - this.loadingText.height) / 2;
  }
}