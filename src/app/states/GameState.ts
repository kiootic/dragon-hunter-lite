import { Container } from 'pixi.js';

export abstract class GameState {
  public abstract get name(): string;

  public readonly root = new Container();

  public enter() { }
  public pause()  { }
  public resume()  { }
  public leave()  { }

  public update(dt: number) { }
  public layout() { }
}