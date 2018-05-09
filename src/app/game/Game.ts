import { App } from 'app';
import { Message } from 'app/game/messages';
import { EntityManager } from 'app/game/EntityManager';
import { GameView } from 'app/game/GameView';
import { TaskManager } from 'app/game/TaskManagers';
import { TileMap } from 'app/game/TileMap';
import { DataLibrary, GameSave } from 'common/data';
import { filter } from 'rxjs/operators/filter';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

export class Game {
  constructor(public readonly app: App, public readonly data: GameSave) {
    this.library = data.library;
  }

  public readonly view = new GameView();
  public readonly keyboard = this.app.keyboard;
  public map!: TileMap;
  public readonly library: DataLibrary;

  public readonly tasks = new TaskManager(this);
  public readonly entities = new EntityManager(this);

  private _paused = false;
  public get paused() { return this._paused; }

  public init() {
    this.map = TileMap.deserialize(this.data.map);
    this.entities.init();
    this.tasks.init();
  }

  public save() {
    this.data.map = this.map.serialize();
    this.entities.save();
  }

  public update(dt: number, paused = false) {
    this._paused = paused;
    // update tasks first to allow check for entity age = 0
    this.tasks.update(dt, paused);
    if (!paused)
      this.entities.update(dt);
  }

  public layout() {
    const { width, height } = this.app.screen;
    this.view.layout(width, height);
  }

  public dispose() {
    this.tasks.dispose();
    this.entities.dispose();
  }

  public get player() { return this.entities.get(1)!; }

  private _message$ = new Subject<Message>();
  public readonly messages$ = Object.assign(this._message$ as Observable<Message>, {
    ofType: <T extends { new(...args: any[]): Message }>(Type: T) => {
      return this.messages$.pipe(filter(msg => msg instanceof Type)) as Observable<InstanceType<T>>;
    }
  });

  public dispatch<T extends Message>(message: T) {
    this._message$.next(message);
    return message;
  }
}