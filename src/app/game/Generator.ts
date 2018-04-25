import { GameSave } from 'common/data';
import work from 'webworkify-webpack';
export interface ProgressReporter {
  (message: string | null, progress: number): void;
}

export class Generator {
  private readonly worker: Worker = work(require.resolve('worker'));

  constructor(
    public readonly width: number,
    public readonly height: number,
    public readonly seed = ''
  ) {

  }

  public async generate(report: ProgressReporter = () => { }) {
    const save = await new Promise<GameSave>(resolve => {
      this.worker.onmessage = ev => {
        if (ev.data.action === 'completed')
          resolve(GameSave.load(ev.data.save));
        else if (ev.data.action === 'progress')
          report(ev.data.message, ev.data.progress);
      };

      this.worker.postMessage({
        action: 'generate',
        width: this.width,
        height: this.height,
        seed: this.seed
      });
    });
    this.worker.terminate();
    return save;
  }
}