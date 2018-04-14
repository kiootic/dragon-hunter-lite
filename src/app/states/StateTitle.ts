import { GameState } from 'app/states/GameState';
import { Container, Text, loaders, Sprite, Texture } from 'pixi.js';
import { App } from 'app/App';
import { fadeOut, fadeIn } from 'app/utils/animations';

export class StateTitle extends GameState {
  public get name() { return 'title'; }

  private logo = new Sprite(Texture.fromFrame('sprites/ui/title'));

  constructor() {
    super();
    this.root.addChild(this.logo);
    this.root.alpha = 0;
    fadeIn(this.root).subscribe();
  }

  update() {
    this.logo.x = (App.instance.screen.width - this.logo.width) / 2;
    this.logo.y = 50;
  }
}