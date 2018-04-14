import { Application } from 'pixi.js';
import Stats = require('stats.js');
import { update as tweenUpdate } from '@tweenjs/tween.js';

export function bootstrap<App extends Application>(app: App) {
  document.body.appendChild(app.view);

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    app.renderer.resize(width, height);
    app.stage.emit('resize');
  };
  window.onresize = resize;
  resize();

  app.ticker.add(() => tweenUpdate());

  const stats = new Stats();
  document.body.appendChild(stats.dom);
  const _update = app.ticker.update;
  app.ticker.update = (...args: any[]) => {
    stats.begin();
    _update.apply(app.ticker, args);
    stats.end();
  };

  return app;
}
