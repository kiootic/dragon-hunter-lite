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

  public init() {
    this.map = new TileMap(256, 256);
    for (let y = 0; y < this.map.height; y++)
      for (let x = 0; x < this.map.width; x++)
        this.map.setTile(x, y, Math.floor(Math.random() * 2) + 2, 0);

    for (let y = 0; y < this.map.height; y++) {
      this.map.setTile(0, y, 1, 0);
      this.map.setTile(this.map.width - 1, y, 1, 0);
    }
    for (let x = 0; x < this.map.width; x++) {
      this.map.setTile(x, 0, 1, 0);
      this.map.setTile(x, this.map.height - 1, 1, 0);
    }

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