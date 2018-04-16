import { GameView } from 'app/game/GameView';
import { App } from 'app';
import { Keyboard } from 'app/utils/Keyboard';
import { Task } from 'app/game/Task';
import { TileMap } from 'app/game/map/TileMap';
import { TerrainDisplayTask } from 'app/game/tasks';

export class Game {
  public readonly view = new GameView(this);
  public readonly keyboard = new Keyboard(App.instance.view);
  public map = new TileMap(0, 0);

  public init(map: TileMap) {
    this.map = map;

    this.addTask(TerrainDisplayTask);
  }

  public update(dt: number) {
    this.updateTasks(dt);

    const { width, height } = App.instance.screen;
    this.view.layout(width, height);
  }

  public dispose() {
    this.keyboard.dispose();
  }

  private tasks: Task[] = [];
  public addTask<T extends Task>(Task: { new(game: Game): Task }) {
    const task = new Task(this);
    this.tasks.push(task);
    task.init();
  }
  private updateTasks(dt: number) {
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