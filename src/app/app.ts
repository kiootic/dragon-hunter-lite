import { Application, loaders, settings, SCALE_MODES } from 'pixi.js';

export class App extends Application {
  constructor() {
    super({
      autoResize: true,
      antialias: true,
      roundPixels: true
    });
    this.view.oncontextmenu = event => event.preventDefault();

    settings.SCALE_MODE = SCALE_MODES.NEAREST;
  }
}