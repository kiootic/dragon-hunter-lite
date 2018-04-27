import { App } from 'app';
import { EntityManager } from 'app/game/EntityManager';
import { GameView } from 'app/game/GameView';
import { TaskManager } from 'app/game/TaskManagers';
import { TileMap } from 'app/game/TileMap';
import { DataLibrary, GameSave } from 'common/data';

export class Game {
  constructor(public readonly app: App, public readonly data: GameSave) {
    this.library = data.library;
  }

  public readonly view = new GameView(this);
  public readonly keyboard = App.instance.keyboard;
  public map!: TileMap;
  public readonly library: DataLibrary;

  public readonly tasks = new TaskManager(this);
  public readonly entities = new EntityManager(this);

  public init() {
    this.map = TileMap.deserialize(this.data.map);
    this.entities.init();
    this.tasks.init();
  }

  public save() {
    this.data.map = this.map.serialize();
    this.entities.save();
  }

  public update(dt: number) {
    this.tasks.update(dt);
  }

  public layout() {
    const { width, height } = App.instance.screen;
    this.view.layout(width, height);
  }

  public dispose() {
  }

  public get player() { return this.entities.get(1)!; }
}