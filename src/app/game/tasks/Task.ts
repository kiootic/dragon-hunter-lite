import { Game } from 'app/game';

export class Task {
  public readonly runWhenPaused: boolean = false;

  private _active = true;
  public get isActive() { return this._active; }
  constructor(protected readonly game: Game) {
  }

  public deactivate() {
    if (!this._active)
      throw new Error('not active');

    this._active = false;
  }

  public update(dt: number) { }
  public dispose() { }
}
