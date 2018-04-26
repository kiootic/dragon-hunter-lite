import { glMatrix } from 'gl-matrix';
import { Application } from 'pixi.js';
import * as Stats from 'stats.js';
import * as vexDialog from 'vex-dialog';
import * as vex from 'vex-js';

import 'vex-js/dist/css/vex-theme-plain.css';
import 'vex-js/dist/css/vex.css';

export function bootstrap<App extends Application>(app: App) {
  document.body.appendChild(app.view);

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    app.renderer.resize(width, height);
  }
  window.onresize = resize;
  resize();

  const stats = new Stats();
  document.body.appendChild(stats.dom);
  const _update = app.ticker.update;
  app.ticker.update = (...args: any[]) => {
    stats.begin();
    _update.apply(app.ticker, args);
    stats.end();
  };

  glMatrix.setMatrixArrayType(Float64Array);

  vex.registerPlugin(vexDialog);
  vex.defaultOptions.className = 'vex-theme-plain';

  return app;
}
