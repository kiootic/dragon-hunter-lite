import { GameOverlay } from 'app/game/overlays';
import { GameState } from 'app/states/GameState';
import { Sprite, Texture } from 'pixi.js';

export class StateOverlay extends GameState {
  public get name() { return 'overlay'; }

  private readonly bg = new Sprite(Texture.WHITE);
  constructor(private readonly overlay: GameOverlay) {
    super(overlay.game.app);
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
    this.overlay.game.update(dt, true);
  }

  layout() {
    const { width, height } = this.app.screen;
    this.bg.width = width;
    this.bg.height = height;
    this.overlay.layout(width, height);
    this.overlay.game.layout();
  }

  async leave() {
    this.overlay.dispose();
  }
}