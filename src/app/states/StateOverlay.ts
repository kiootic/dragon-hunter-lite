import { App } from 'app';
import { GameOverlay } from 'app/game';
import { GameState } from 'app/states/GameState';
import { Sprite, Texture } from 'pixi.js';

export class StateOverlay extends GameState {
  public get name() { return 'overlay'; }

  private readonly bg = new Sprite(Texture.WHITE);
  constructor(private readonly overlay: GameOverlay) {
    super();
    this.bg.tint = 0;
    this.bg.alpha = 0.5;
    this.root.addChild(this.bg);
    this.root.addChild(this.overlay);
  }

  async enter() {
    this.overlay.init();
  }

  update(dt: number) {
    this.overlay.update(dt);
  }

  layout() {
    const { width, height } = App.instance.screen;
    this.bg.width = width;
    this.bg.height = height;
    this.overlay.layout(width, height);
  }

  async leave() {
    this.overlay.dispose();
  }
}