import { Container, Text, loaders } from 'pixi.js';
import * as FontFaceObserver from 'fontfaceobserver';
import { App } from 'app';
import { GameState, StateTitle } from 'app/states';
import { fadeOut } from 'app/utils/animations';

export class StatePreload extends GameState {
  public get name() { return 'preload'; }

  private loadingText = new Text('loading...\n', {
    fill: 'white',
    fontSize: 14,
    lineHeight: 20,
    align: 'center',
  });
  constructor() {
    super();
    this.root.addChild(this.loadingText);
  }

  update() {
    this.loadingText.x = (App.instance.screen.width - this.loadingText.width) / 2;
    this.loadingText.y = (App.instance.screen.height - this.loadingText.height) / 2;
  }

  enter() {
    this.run();
  }

  private run() {
    const loader = App.instance.loader;
    const progressHandler = loader.onProgress.add(() => {
      this.loadingText.text = `loading...\n${Math.round(loader.progress)}%`;
    });

    loader.baseUrl = 'assets';
    const context = require.context('assets', true, /.*/);
    for (const key of context.keys()) {
      const match = /^\.\/(.*)\.(.*)$/.exec(key);
      if (!match) continue;

      const [, name, ext] = match;
      if (name.startsWith('sprites/') && ext !== 'json') {
        continue;
      }
      loader.add(name, context(key));
    }

    loader.pre((res: loaders.Resource, next: () => void) => {
      res.url = res.url.replace('assets/', '');
      if (res.name.startsWith('sprites/') && res.extension === 'json') {
        res.onComplete.once(() => {
          res.data.meta.image = context(`./sprites/${res.data.meta.image}`);
        });
      }
      next();
    });

    const fontLoad = new FontFaceObserver('Unibody8Pro').load();

    loader.load((_: any, resources: Record<string, loaders.Resource>) => {
      loader.onProgress.detach(progressHandler);

      for (const name of Object.keys(resources)) {
        const resource = resources[name];
        if (resource.type === loaders.Resource.TYPE.JSON &&
          !(resource as any)['spritesheet']) {
          App.instance.resources[name] = resource.data;
        }
      }

      fontLoad.then(() => fadeOut(this.root).subscribe(() => App.instance.topState(new StateTitle())));
    });
  }
}