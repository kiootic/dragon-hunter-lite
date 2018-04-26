import { App, TextScaleFactor } from 'app';
import { Text, TextButton } from 'app/components';
import { Generator } from 'app/game';
import { GameState } from 'app/states/GameState';
import { StateMain } from 'app/states/StateMain';
import { fadeIn, fadeOut } from 'app/utils/animations';
import { Sprite, Texture } from 'pixi.js';

export class StateTitle extends GameState {
  public get name() { return 'title'; }

  private logo = new Sprite(Texture.fromFrame('sprites/ui/title'));
  private playButton = new TextButton('play');
  private loadBar = new Sprite(Texture.WHITE);
  private loadMessage = new Text('', { scale: TextScaleFactor });

  constructor() {
    super();

    this.root.addChild(this.logo);
    this.root.addChild(this.playButton);
    this.root.addChild(this.loadBar);
    this.root.addChild(this.loadMessage);
    this.playButton.on(TextButton.Clicked, this.start.bind(this));
    this.loadBar.tint = 0x404040;
    this.loadBar.width = 0;
  }

  async enter() {
    this.root.alpha = 0;
    await fadeIn(this.root).toPromise();
  }

  async pause() {
    this.root.alpha = 1;
    await fadeOut(this.root).toPromise();
    this.playButton.isEnabled = true;
    this.loadMessage.text = '';
    this.loadBar.width = 0;
  }

  async resume() {
    this.root.alpha = 0;
    await fadeIn(this.root).toPromise();
  }

  layout() {
    const contentHeight = this.logo.height + 50 + 75 + 20 + 50;

    this.logo.x = (App.instance.screen.width - this.logo.width) / 2;
    this.logo.y = (App.instance.screen.height - contentHeight) / 2;
    this.playButton.x = (App.instance.screen.width - 150) / 2;
    this.playButton.y = this.logo.y + this.logo.height + 50;
    this.playButton.layout(150, 75);
    this.loadMessage.x = 0;
    this.loadMessage.y = this.playButton.y + 75 + 20;
    this.loadMessage.layout(App.instance.screen.width, 50);
    this.loadBar.x = App.instance.screen.width / 4;
    this.loadBar.y = this.playButton.y + 75 + 20;
    this.loadBar.height = 50;
  }

  async start() {
    this.playButton.isEnabled = false;
    const map = await new Generator(2048, 2048, '1').generate((message, progress) => {
      if (message)
        this.loadMessage.text = message;
      this.loadBar.width = (App.instance.screen.width / 2) * progress;
    });

    await App.instance.pushState(new StateMain(map));
  }
}