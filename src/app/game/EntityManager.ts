import { Game } from 'app/game';
import { Entity, EntityType } from 'app/game/entities';
import { Trait, TraitType } from 'app/game/traits';
import { EntityProps } from 'common/data/props';

export class EntityManager {
  private readonly entities = new Map<number, Entity>();

  constructor(private readonly game: Game) {
  }

  public init() {
    for (const entityProps of this.game.data.entities) {
      const EntityType = Entity.types.get(entityProps.type)!;
      const entity = new EntityType(this.game, entityProps.id);
      entity.age = entityProps.age;
      for (const traitType of Object.keys(entityProps.traits)) {
        const TraitType = Trait.types.get(traitType)!;
        const trait = TraitType.deserialize(entityProps.traits[traitType], entity.traits(TraitType));
        entity.traits.set(trait);
      }
      this.add(entity);
    }
  }

  public dispose() {
  }

  public save() {
    this.game.data.entities = Array.from(this.entities.values()).map(entity => {
      const props: EntityProps = {
        id: entity.id,
        type: entity.type,
        age: entity.age,
        traits: {}
      };
      for (const trait of entity.traits.list())
        props.traits[trait.type] = Trait.types.get(trait.type)!.serialize(trait);
      return props;
    });
  }

  public *ofType<T extends Entity>(entityType: EntityType<T>) {
    for (const entity of this.entities.values()) {
      if (entity.type === entityType.Type)
        yield entity;
    }
  }

  public *withTrait<T extends Trait>(traitType: TraitType<T>) {
    for (const entity of this.entities.values()) {
      if (entity.traits.get(traitType))
        yield entity;
    }
  }

  public get(id: number) {
    return this.entities.get(id);
  }

  public add(entity: Entity) {
    entity.hydrate();
    this.entities.set(entity.id, entity);
  }

  public delete(entity: Entity) {
    this.entities.delete(entity.id);
  }

  public update(dt: number) {
    for (const entity of this.entities.values())
      entity.age += dt;
  }
}