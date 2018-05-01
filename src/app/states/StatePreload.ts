import { App } from 'app';
import { GameState } from 'app/states/GameState';
import { StateTitle } from 'app/states/StateTitle';
import { fadeOut } from 'app/utils/animations';
import * as FontFaceObserver from 'fontfaceobserver';
import { loaders, Text } from 'pixi.js';

export class StatePreload extends GameState {
  public get name() { return 'preload'; }

  private loadingText = new Text('loading...\n', {
    fill: 'white',
    fontSize: 14,
    lineHeight: 20,
    align: 'center',
  });

  constructor(app: App) {
    super(app);
    this.root.addChild(this.loadingText);
  }

  async enter() {
    this.run();
  }

  layout() {
    this.loadingText.x = (this.app.screen.width - this.loadingText.width) / 2;
    this.loadingText.y = (this.app.screen.height - this.loadingText.height) / 2;
  }

  private run() {
    const loader = this.app.loader;
    const progressHandler = loader.onProgress.add(() => {
      this.loadingText.text = `loading...\n${Math.round(loader.progress)}%`;
    });

    const context = require.context('assets', true, /.*/);
    for (const key of context.keys()) {
      const match = /^\.\/(.*)\.(.*)$/.exec(key);
      if (!match) continue;

      const [, name, ext] = match;
      if (name.startsWith('sprites/')) {
        if (ext === 'json')
          loader.add(name, key);
      } else {
        loader.add(name, context(key));
      }
    }

    loader.pre((res: loaders.Resource, next: () => void) => {
      if (res.name.startsWith('sprites/') && res.extension === 'json') {
        res.type = loaders.Resource.TYPE.JSON;
        res.data = context(res.url);
        res.data.meta.image = `../${context(`./sprites/${res.data.meta.image}`)}`;
        res.complete();
      }
      next();
    });

    const fontLoad = Promise.all([
      new FontFaceObserver('Unibody8Pro').load(),
      new FontFaceObserver('Unibody8Pro', { weight: 'bold' }).load(),
    ]);

    loader.load(async (_: any, resources: Record<string, loaders.Resource>) => {
      loader.onProgress.detach(progressHandler);

      for (const name of Object.keys(resources)) {
        const resource = resources[name];
        if (resource.type === loaders.Resource.TYPE.JSON &&
          !(resource as any)['spritesheet']) {
          this.app.resources[name] = resource.data;
        }
      }

      await fontLoad;
      await fadeOut(this.root).toPromise();
      await this.app.topState(new StateTitle(this.app));
    });
  }
}