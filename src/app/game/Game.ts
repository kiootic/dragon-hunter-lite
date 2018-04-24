import { GameView } from 'app/game/GameView';
import { App, DisplayTileSize } from 'app';
import { Keyboard } from 'app/utils/Keyboard';
import { Task } from 'app/game/Task';
import { TileMap } from 'app/game/map';
import { TerrainDisplayTask, ObjectDisplayTask, MiniMapTask } from 'app/game/tasks';
import { GameSave } from 'common/data';
import { vec2 } from 'gl-matrix';

export class Game {
  constructor(public readonly save: GameSave) {
    this.map = TileMap.deserialize(save.map);
    this.offsetX = this.map.props.spawn[0] * DisplayTileSize;
    this.offsetY = this.map.props.spawn[1] * DisplayTileSize;
  }

  public readonly view = new GameView(this);
  public readonly keyboard = new Keyboard(App.instance.view);
  public readonly map: TileMap;
  public get library() { return this.save.library; }

  public init() {
    this.addTask(TerrainDisplayTask);
    this.addTask(ObjectDisplayTask);
    this.addTask(MiniMapTask);
  }

  public update(dt: number) {
    this.updateTasks(dt);

    const { width, height } = App.instance.screen;
    this.view.layout(width, height);
  }

  public dispose() {
    this.keyboard.dispose();
  }

  private offsetX = 0;
  private offsetY = 0;

  private tasks: Task[] = [];
  public addTask<T extends Task>(Task: { new(game: Game): Task }) {
    const task = new Task(this);
    this.tasks.push(task);
    task.init();
  }
  private updateTasks(dt: number) {
    const v = vec2.fromValues(0, 0);
    if (this.keyboard.isDown('a')) v[0]--;
    if (this.keyboard.isDown('d')) v[0]++;
    if (this.keyboard.isDown('w')) v[1]--;
    if (this.keyboard.isDown('s')) v[1]++;
    vec2.normalize(v, v);
    if (this.keyboard.isDown('Control')) vec2.scale(v, v, 10);
    const [x, y] = vec2.scale(v, v, dt / 1000 * 10 * 64);
    this.offsetX += v[0];
    this.offsetY += v[1];
    this.view.offsetX = Math.round(this.offsetX);
    this.view.offsetY = Math.round(this.offsetY);

    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].isActive)
        this.tasks[i].update(dt);
      else {
        this.tasks[i].dispose();
        this.tasks.splice(i, 1);
        i--;
      }
    }
  }
}