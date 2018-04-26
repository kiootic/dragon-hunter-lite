import { App } from 'app';
import { Player } from 'app/game/entities/Player';
import { Entity } from 'app/game/Entity';
import { GameView } from 'app/game/GameView';
import { TileMap } from 'app/game/map';
import { Task } from 'app/game/Task';
import * as tasks from 'app/game/tasks';
import { Trait } from 'app/game/Trait';
import { GameSave } from 'common/data';

export class Game {
  constructor(public readonly save: GameSave) {
    this.map = TileMap.deserialize(save.map);
  }

  public readonly view = new GameView(this);
  public readonly keyboard = App.instance.keyboard;
  public readonly map: TileMap;
  public get library() { return this.save.library; }

  public init() {
    new Player(this);
    this.addTask(tasks.PlayerInputTask);
    this.addTask(tasks.EntityMovementTask);

    this.addTask(tasks.CameraUpdateTask);
    this.addTask(tasks.TerrainDisplayTask);
    this.addTask(tasks.ObjectDisplayTask);
    this.addTask(tasks.EntityDisplayTask);
    this.addTask(tasks.MiniMapTask);
  }

  public update(dt: number) {
    this.updateTasks(dt);
  }

  public layout() {
    const { width, height } = App.instance.screen;
    this.view.layout(width, height);
  }

  public dispose() {
  }

  public readonly entities = Object.assign(new Map<number, Entity>(), {
    findType: (entityType: typeof Entity & { Type: string }) => {
      return Array.from(this.entities.values()).filter(entity => entity.type === entityType.Type);
    },
    findTrait: <T extends Trait>(traitType: { _mark: T, Type: string }) => {
      return Array.from(this.entities.values()).filter(entity => entity.traits.get(traitType));
    }
  });

  public get player() { return this.entities.get(1)!; }

  private readonly tasks: Task[] = [];
  public addTask<T extends Task>(Task: { new(game: Game): Task }) {
    const task = new Task(this);
    this.tasks.push(task);
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