import { Game } from 'app/game';
import { Entity } from 'app/game/entities';
import { Float, ProjectileData, Spatial } from 'app/game/traits';
import { Camera } from 'app/game/Camera';
import { Effect, Weapon } from 'common/data';
import { vec2 } from 'gl-matrix';

export class Projectile extends Entity {
  public static _mark: Projectile;
  public static readonly Type = 'projectile';
  public get type() { return Projectile.Type; }

  public static make(game: Game,
    sourceEntityId: number, weapon: Weapon, effects: Effect[],
    start: vec2, end: vec2, lifetime: number, texture: string
  ) {
    const entity = new Projectile(game);

    const spatial = entity.traits.get(Spatial);
    vec2.copy(spatial.position, start);

    const float = entity.traits.get(Float);
    float.z[0] = 0.001;
    float.gravity = false;

    entity.traits.set(ProjectileData.make({
      sourceEntityId, weapon, effects,
      start, end, lifetime,
      texture: {
        type: 'single',
        tex: texture,
        tint: weapon.color
      }
    }));
    return entity;
  }

  init() {
    const spatial = this.traits(Spatial, { solid: false });
    vec2.set(spatial.scale, 4, 4);
    vec2.set(spatial.size, 0.5, 0.5);

    this.traits(Float);
  }

  hydrate() {
    const spatial = this.traits.get(Spatial);
    const data = this.traits.get(ProjectileData);
    spatial.sprite.layer = Camera.Layer.Projectiles;
    spatial.sprite.setTexture(data.texture);
    spatial.sprite.anchor.set(1, -0.5);
    spatial.sprite.pivot.set(0, spatial.sprite.height / 2);

    spatial.sprite.rotation = -3 * Math.PI / 4 +
      Math.atan2(data.start[1] - data.end[1], data.start[0] - data.end[0]);
  }
}
Entity.types.set(Projectile.Type, Projectile);
