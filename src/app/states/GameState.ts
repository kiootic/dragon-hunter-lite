import { App } from 'app';
import { Container } from 'pixi.js';

export abstract class GameState {
  constructor(public readonly app: App) {
  }

  public abstract get name(): string;

  public readonly root = new Container();

  public async enter() { }
  public async pause() { }
  public async resume() { }
  public async leave() { }

  public update(dt: number) { }
  public layout() { }
}