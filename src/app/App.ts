import * as TWEEN from '@tweenjs/tween.js';
import { GameState } from 'app/states';
import { Keyboard } from 'app/utils/Keyboard';
import { DragDrop } from 'app/DragDrop';
import { settings, Application, Container, Rectangle, SCALE_MODES } from 'pixi.js';

export class App extends Application {
  public readonly root = this.stage.addChild(new Container());

  constructor() {
    super({
      autoResize: true,
      antialias: true,
      roundPixels: true
    });
    this.view.oncontextmenu = event => event.preventDefault();

    settings.SCALE_MODE = SCALE_MODES.NEAREST;
    this.ticker.add(this.tick.bind(this));
  }

  private _states: GameState[] = [];
  public get state(): GameState | null { return this._states[this._states.length - 1] || null; }
  public async pushState(next: GameState) {
    if (this.state) {
      await this.state.pause();
      this.state.root.hitArea = Rectangle.EMPTY;
    }
    this._states.push(next);
    this.root.addChild(next.root);
    await next.enter();
  }
  public async popState() {
    if (this.state) {
      await this.state.leave();
      this.root.removeChild(this.state.root);
      this._states.pop();
    }
    if (this.state) {
      this.state.root.hitArea = null as any;
      await this.state.resume();
    }
  }
  public async topState(next: GameState) {
    await this.popState();
    await this.pushState(next);
  }

  private tick() {
    this.state && this.state.update(this.ticker.elapsedMS);
    TWEEN.update();
    this.keyboard.update();
  }

  public render() {
    this.state && this.state.layout();
    this.dragDrop.layout();
    super.render();
  }

  public readonly resources: Record<string, any> = {};
  public readonly keyboard = new Keyboard(this.view);
  public readonly dragDrop = new DragDrop(this);
}