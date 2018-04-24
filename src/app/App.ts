import * as TWEEN from '@tweenjs/tween.js';
import { GameState } from 'app/states';
import { Application, SCALE_MODES, settings } from 'pixi.js';

export const UIScaleFactor = 4;
export const TextScaleFactor = 2;
export const DisplayTileSize = 64;

export class App extends Application {
  private constructor() {
    super({
      autoResize: true,
      antialias: true,
      roundPixels: true
    });
    this.view.oncontextmenu = event => event.preventDefault();

    settings.SCALE_MODE = SCALE_MODES.NEAREST;
    this.ticker.add(this.tick.bind(this));
  }

  private static _instance: App;
  public static get instance() {
    if (!App._instance) App._instance = new App();
    return App._instance;
  }

  private _states: GameState[] = [];
  public get state(): GameState | null { return this._states[this._states.length - 1] || null; }
  public pushState(next: GameState) {
    if (this.state) {
      this.state.pause();
    }
    this._states.push(next);
    next.enter();
    this.stage.addChild(next.root);
  }
  public popState() {
    if (this.state) {
      this.state.leave();
      this.stage.removeChild(this.state.root);
      this._states.pop();
    }
    if (this.state) {
      this.state.resume();
    }
  }
  public topState(next: GameState) {
    this.popState();
    this.pushState(next);
  }

  private tick() {
    this.state && this.state.update(this.ticker.elapsedMS);
    TWEEN.update();
  }

  public readonly resources: Record<string, any> = {};
}