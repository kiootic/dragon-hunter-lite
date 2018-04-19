import { Container, loaders, Sprite, Texture } from 'pixi.js';
import { App } from 'app';
import { GameState } from 'app/states/GameState';
import { StateMain } from 'app/states/StateMain';
import { fadeOut, fadeIn } from 'app/utils/animations';
import { Button, Text } from 'app/components';
import { Generator } from 'app/game/map/Generator';
import { TextScaleFactor } from 'app/App';

export class StateTitle extends GameState {
  public get name() { return 'title'; }

  private logo = new Sprite(Texture.fromFrame('sprites/ui/title'));
  private playButton = new Button();
  private playText = new Text('play');
  private loadBar = new Sprite(Texture.WHITE);
  private loadMessage = new Text('', { scale: TextScaleFactor });

  constructor() {
    super();

    this.root.addChild(this.logo);
    this.root.addChild(this.playButton);
    this.root.addChild(this.loadBar);
    this.root.addChild(this.loadMessage);
    this.playButton.content.addChild(this.playText);
    this.playButton.on(Button.Clicked, this.start.bind(this));
    this.loadBar.tint = 0x404040;
    this.loadBar.width = 0;
  }

  enter() {
    this.root.alpha = 0;
    fadeIn(this.root).subscribe();
  }

  update() {
    const contentWidth = Math.max(this.logo.width, 150);
    const contentHeight = this.logo.height + 50 + 75 + 20 + 50;

    this.logo.x = (App.instance.screen.width - this.logo.width) / 2;
    this.logo.y = (App.instance.screen.height - contentHeight) / 2;
    this.playButton.x = (App.instance.screen.width - 150) / 2;
    this.playButton.y = this.logo.y + this.logo.height + 50;
    this.playButton.layout(150, 75);
    this.playText.x = 0;
    this.playText.y = 0;
    this.playText.layout(this.playButton.contentWidth, this.playButton.contentHeight);
    this.loadMessage.x = 0;
    this.loadMessage.y = this.playButton.y + 75 + 20;
    this.loadMessage.layout(App.instance.screen.width, 50);
    this.loadBar.x = App.instance.screen.width / 4;
    this.loadBar.y = this.playButton.y + 75 + 20;
    this.loadBar.height = 50;
  }

  async start() {
    this.playButton.isEnabled = false;
    const { map, library } = await new Generator(2048, 2048, '1').generate((message, progress) => {
      if (message)
        this.loadMessage.text = message;
      this.loadBar.width = (App.instance.screen.width / 2) * progress;
    });

    App.instance.library = library;
    fadeOut(this.root).subscribe(() => App.instance.topState(new StateMain(map)));
  }
}