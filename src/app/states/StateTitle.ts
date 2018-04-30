import { App, MapSize } from 'app';
import { Text, TextButton } from 'app/components';
import { Generator } from 'app/game/Generator';
import { GameState } from 'app/states/GameState';
import { StateMain } from 'app/states/StateMain';
import { fadeIn, fadeOut } from 'app/utils/animations';
import { GameSave } from 'common/data';
import { Sprite, Texture } from 'pixi.js';

export class StateTitle extends GameState {
  public get name() { return 'title'; }

  private logo = new Sprite(Texture.fromFrame('sprites/ui/title'));
  private newButton = new TextButton('new game');
  private loadBar = new Sprite(Texture.WHITE);
  private loadMessage = new Text('');
  private saveLabel = new Text('saves');
  private saveButtons: TextButton[] = [];

  constructor(app: App) {
    super(app);

    this.root.addChild(this.logo);
    this.root.addChild(this.newButton);
    this.root.addChild(this.loadBar);
    this.root.addChild(this.loadMessage);
    this.newButton.on(TextButton.Clicked, this.newGame.bind(this));
    this.loadBar.tint = 0x404040;
    this.loadBar.width = 0;
  }

  async enter() {
    this.updateSaves();
    this.root.alpha = 0;
    await fadeIn(this.root).toPromise();
  }

  async pause() {
    this.root.alpha = 1;
    await fadeOut(this.root).toPromise();
  }

  async resume() {
    this.updateSaves();
    this.newButton.isEnabled = true;
    this.loadMessage.text = '';
    this.loadBar.width = 0;

    this.root.alpha = 0;
    await fadeIn(this.root).toPromise();
  }

  private updateSaves() {
    for (const btn of this.saveButtons)
      this.root.removeChild(btn);

    this.saveButtons = [];
    for (const name of Object.keys(localStorage).sort()) {
      const btn = new TextButton(name);
      btn.on(TextButton.Clicked, () => this.startGame(GameSave.import(localStorage[name])));
      this.root.addChild(btn);
      this.saveButtons.push(btn);
    }
    if (this.saveButtons.length > 0)
      this.root.addChild(this.saveLabel);
  }

  layout() {
    const contentHeight = this.logo.height + 50 + 75 + 20 + 50;
    const { width, height } = this.app.screen;

    this.logo.position.set((width - this.logo.width) / 2, (height - contentHeight) / 2);
    this.newButton.position.set((width - 160) / 2, this.logo.y + this.logo.height + 50);
    this.newButton.layout(160, 64);
    this.loadMessage.position.set(0, this.newButton.y + 64 + 20);
    this.loadMessage.layout(width, 50);
    this.loadBar.position.set(width / 4, this.newButton.y + 64 + 20);
    this.loadBar.height = 50;

    this.saveLabel.position.set(width - 256, 64);
    this.saveLabel.layout(192, 48);
    let y = this.saveLabel.y + 48 + 16;
    for (const button of this.saveButtons) {
      button.position.set(width - 256, y);
      button.layout(192, 48);
      y += 48 + 16;
    }
  }

  async newGame() {
    this.newButton.isEnabled = false;
    this.saveButtons.forEach(btn => btn.isEnabled = false);
    const data = await new Generator(MapSize, MapSize, '1').generate((message, progress) => {
      if (message)
        this.loadMessage.text = message;
      this.loadBar.width = (this.app.screen.width / 2) * progress;
    });

    await this.startGame(data);
  }

  private async startGame(data: GameSave) {
    this.newButton.isEnabled = false;
    this.saveButtons.forEach(btn => btn.isEnabled = false);
    await this.app.pushState(new StateMain(this.app, data));
  }
}