import { TileMap } from "app/game/map/TileMap";
import { DataLibrary } from "app/data";

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

  public async generate(reporter: ProgressReporter = () => { }) {
    const [map, library] = await new Promise<[TileMap, DataLibrary]>(resolve => {
      this.worker.onmessage = ev => {
        if (ev.data.action === 'completed')
          resolve([TileMap.deserialize(ev.data.map), ev.data.library]);
        else if (ev.data.action === 'progress')
          reporter(ev.data.message, ev.data.progress);
      };

      this.worker.postMessage({
        action: 'generate',
        width: this.width,
        height: this.height,
        seed: this.seed
      });
    });
    this.worker.terminate();
    return { map, library };
  }
}