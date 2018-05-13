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
    entity.traits.get(EnemyData).def = def;
    entity.traits.get(Behavior).behaviors = def.behaviors;
    Object.assign(entity.traits.get(Stats).base, def.stats);
    vec2.copy(entity.traits.get(Spatial).position, position);
    return entity;
  }

  init() {
    this.traits(Spatial);

    this.traits(Collidable);

    this.traits(Stats);
    this.traits(EnemyData);
    this.traits(Behavior);
  }

  hydrate() {
    const data = this.traits.get(EnemyData);

    const spatial = this.traits.get(Spatial);
    spatial.sprite.setTexture(data.def.texture, this.id);
    spatial.horizontalAnim = data.def.horizontalAnim;
    vec2.set(spatial.scale, data.def.scale * 2, data.def.scale * 2);
    vec2.set(spatial.offset, data.def.offset[0], data.def.offset[1]);

    const collidable = this.traits.get(Collidable);
    vec2.set(collidable.size, 0.4 * data.def.scale, 0.4 * data.def.scale);
  }
}
Entity.types.set(Enemy.Type, Enemy);
