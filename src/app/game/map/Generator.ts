import { TileMap } from 'app/game/map/TileMap';
import { DataLibrary } from 'app/data';
import { App } from 'app';

export interface ProgressReporter {
  (message: string | null, progress: number): void;
}

export class Generator {
  private readonly worker = new Worker('worker.js');

  constructor(
    public readonly width: number,
    public readonly height: number,
    public readonly seed = ''
  ) {

  }

  public async generate(report: ProgressReporter = () => { }) {
    const map = await new Promise<TileMap>(resolve => {
      this.worker.onmessage = ev => {
        if (ev.data.action === 'completed')
          resolve(TileMap.deserialize(ev.data.map));
        else if (ev.data.action === 'progress')
          report(ev.data.message, ev.data.progress);
      };

      this.worker.postMessage({
        action: 'generate',
        width: this.width,
        height: this.height,
        seed: this.seed,
        library: App.instance.library
      });
    });
    this.worker.terminate();
    return map;
  }
}