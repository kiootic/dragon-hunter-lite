import { Game } from 'app/game';
import { Task } from 'app/game/tasks';
import { ProjectileData } from 'app/game/traits';
import { Spatial } from 'app/game/traits';
import { vec2 } from 'gl-matrix';

export class ProjectileTask extends Task {
  constructor(game: Game) {
    super(game);
  }

  private readonly target = vec2.create();
  update(dt: number) {
    for (const entity of this.game.entities.withTrait(ProjectileData)) {
      const projectile = entity.traits.get(ProjectileData);
      if (entity.age >= projectile.lifetime) {
        entity.delete();
        continue;
      }

      const spatial = entity.traits.get(Spatial);
      vec2.sub(this.target, projectile.end, projectile.start);
      vec2.scaleAndAdd(this.target, projectile.start, this.target, entity.age / projectile.lifetime);
      vec2.sub(spatial.velocity, this.target, spatial.position);
      vec2.scale(spatial.velocity, spatial.velocity, 1000 / dt);
    }
  }
}