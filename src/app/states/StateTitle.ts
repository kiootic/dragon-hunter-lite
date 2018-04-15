import { Container, loaders, Sprite, Texture } from 'pixi.js';
import { App } from 'app';
import { GameState } from 'app/states/GameState';
import { StateMain } from 'app/states/StateMain';
import { fadeOut, fadeIn } from 'app/utils/animations';
import { Button, Text } from 'app/components';

export class StateTitle extends GameState {
  public get name() { return 'title'; }

  private logo = new Sprite(Texture.fromFrame('sprites/ui/title'));
  private playButton = new Button();
  private playText = new Text('play');

  constructor() {
    super();

    this.root.addChild(this.logo);
    this.root.addChild(this.playButton);
    this.playButton.content.addChild(this.playText);
    this.playButton.on(Button.Clicked, this.start.bind(this));
  }

  enter() {
    this.root.alpha = 0;
    fadeIn(this.root).subscribe();
  }

  update() {
    const contentWidth = Math.max(this.logo.width, 150);
    const contentHeight = this.logo.height + 50 + 75;

    this.logo.x = (App.instance.screen.width - this.logo.width) / 2;
    this.logo.y = (App.instance.screen.height - contentHeight) / 2;
    this.playButton.x = (App.instance.screen.width - 150) / 2;
    this.playButton.y = this.logo.y + this.logo.height + 50;
    this.playButton.layout(150, 75);
    this.playText.x = 0;
    this.playText.y = 0;
    this.playText.layout(this.playButton.contentWidth, this.playButton.contentHeight);
  }

  start() {
    fadeOut(this.root).subscribe(() => App.instance.topState(new StateMain()));
  }
}