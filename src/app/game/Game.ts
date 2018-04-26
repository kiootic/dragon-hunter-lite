import { App } from 'app';
import 'app/game/entities';
import { Entity, EntityType } from 'app/game/Entity';
import { GameView } from 'app/game/GameView';
import { TileMap } from 'app/game/map';
import { Task } from 'app/game/Task';
import * as tasks from 'app/game/tasks';
import { Trait, TraitType } from 'app/game/Trait';
import 'app/game/traits';
import { GameSave } from 'common/data';
import { EntityProps } from 'common/data/props';

export class Game {
  constructor(public readonly data: GameSave) {
    this.map = TileMap.deserialize(data.map);
  }

  public readonly view = new GameView(this);
  public readonly keyboard = App.instance.keyboard;
  public readonly map: TileMap;
  public get library() { return this.data.library; }

  public init() {
    this.load();

    this.addTask(tasks.PlayerInputTask);
    this.addTask(tasks.EntityMovementTask);

    this.addTask(tasks.CameraUpdateTask);
    this.addTask(tasks.TerrainDisplayTask);
    this.addTask(tasks.ObjectDisplayTask);
    this.addTask(tasks.EntityDisplayTask);
    this.addTask(tasks.MiniMapTask);
  }

  private load() {
    for (const entityProps of this.data.entities) {
      const EntityType = Entity.types.get(entityProps.type)!;
      const entity = new EntityType(this, entityProps.id);
      for (const traitType of Object.keys(entityProps.traits)) {
        const TraitType = Trait.types.get(traitType)!;
        const trait = TraitType.deserialize(entityProps.traits[traitType]);
        entity.traits.set(trait);
      }
      this.entities.add(entity);
    }
  }

  public save() {
    this.data.map = this.map.serialize();
    this.data.entities = Array.from(this.entities.values()).map(entity => {
      const props: EntityProps = {
        id: entity.id,
        type: entity.type,
        traits: {}
      };
      for (const trait of entity.traits.list())
        props.traits[trait.type] = Trait.types.get(trait.type)!.serialize(trait);
      return props;
    });
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
    findType: <T extends Entity>(entityType: EntityType<T>) => {
      return Array.from(this.entities.values()).filter(entity => entity.type === entityType.Type);
    },
    findTrait: <T extends Trait>(traitType: TraitType<T>) => {
      return Array.from(this.entities.values()).filter(entity => entity.traits.get(traitType));
    },
    add: (entity: Entity) => {
      entity.init();
      this.entities.set(entity.id, entity);
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