import { Game } from 'app/game';
import { Entity } from 'app/game/entities';
import { EnemyData, Spatial, Stats } from 'app/game/traits';
import { Animations } from 'data/animations';
import { vec2 } from 'gl-matrix';

export class Enemy extends Entity {
  public static _mark: Enemy;
  public static readonly Type = 'enemy';
  public get type() { return Enemy.Type; }

  public static make(game: Game, type: string, position: vec2) {
    const entity = new Enemy(game);
    entity.traits.get(EnemyData).animation = type;
    vec2.copy(entity.traits.get(Spatial).position, position);
    return entity;
  }

  init() {
    const spatial = this.traits(Spatial);
    vec2.set(spatial.scale, 2, 2);
    vec2.set(spatial.size, 0.25, 0.25);

    this.traits(Stats);
    this.traits(EnemyData);
  }

  hydrate() {
    const data = this.traits.get(EnemyData);
    this.traits.get(Spatial).sprite.setTexture(Animations[data.animation], this.id);
  }
}
Entity.types.set(Enemy.Type, Enemy);
