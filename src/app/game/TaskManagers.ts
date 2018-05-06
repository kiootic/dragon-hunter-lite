import { Game } from 'app/game';
import * as tasks from 'app/game/tasks';

type Task = tasks.Task;

export class TaskManager {
  private readonly tasks: Task[] = [];

  constructor(private readonly game: Game) {
  }

  public init() {
    this.add(tasks.PlayerInputTask);

    this.add(tasks.EffectTask);
    this.add(tasks.EntityMovementTask);

    this.add(tasks.UseItemTask);
    this.add(tasks.AttackTask);
    this.add(tasks.InventoryTask);

    this.add(tasks.CameraUpdateTask);
    this.add(tasks.TerrainDisplayTask);
    this.add(tasks.ObjectDisplayTask);
    this.add(tasks.EntityDisplayTask);

    this.add(tasks.FXTask);
    this.add(tasks.ParticleTask);
    this.add(tasks.HUDTask);
  }

  public dispose() {
    for (const task of this.tasks)
      task.dispose();
    this.tasks.length = 0;
  }

  public add<T extends Task>(Task: { new(game: Game): Task }) {
    const task = new Task(this.game);
    this.tasks.push(task);
  }

  public update(dt: number, paused: boolean) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].isActive) {
        if (!paused || this.tasks[i].runWhenPaused)
          this.tasks[i].update(dt);
      }
      else {
        this.tasks[i].dispose();
        this.tasks.splice(i, 1);
        i--;
      }
    }
  }
}