import { Game } from 'app/game';
import { Entity } from 'app/game/entities';
import { Behavior, Collidable, EnemyData, Spatial, Stats } from 'app/game/traits';
import { EnemyDef } from 'common/data';
import { vec2 } from 'gl-matrix';

export class Enemy extends Entity {
  public static _mark: Enemy;
  public static readonly Type = 'enemy';
  public get type() { return Enemy.Type; }

  public static make(game: Game, def: EnemyDef, position: vec2) {
    const entity = new Enemy(game);
    entity.traits.get(EnemyData).name = def.name;
    entity.traits.get(EnemyData).texture = def.texture;
    entity.traits.get(EnemyData).drops = def.drops;
    entity.traits.get(Behavior).behaviors = def.behaviors;
    Object.assign(entity.traits.get(Stats).base, def.stats);
    vec2.copy(entity.traits.get(Spatial).position, position);
    return entity;
  }

  init() {
    const spatial = this.traits(Spatial);
    vec2.set(spatial.scale, 2, 2);

    const collidable = this.traits(Collidable);
    vec2.set(collidable.size, 0.4, 0.4);

    this.traits(Stats);
    this.traits(EnemyData);
    this.traits(Behavior);
  }

  hydrate() {
    const data = this.traits.get(EnemyData);
    this.traits.get(Spatial).sprite.setTexture(data.texture, this.id);
  }
}
Entity.types.set(Enemy.Type, Enemy);
