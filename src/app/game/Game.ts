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
    this.entities.update(dt);
    this.tasks.update(dt);
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

  public dispatch(message: Message) {
    this._message$.next(message);
  }
}