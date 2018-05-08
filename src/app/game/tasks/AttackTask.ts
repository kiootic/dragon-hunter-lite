import { Game } from 'app/game';
import { Projectile } from 'app/game/entities/Projectile';
import { Attack } from 'app/game/messages';
import { Task } from 'app/game/tasks';
import { Spatial } from 'app/game/traits';
import { Weapon } from 'common/data';
import { vec2 } from 'gl-matrix';

export class AttackTask extends Task {
  constructor(game: Game) {
    super(game);
    game.messages$.ofType(Attack).subscribe(this.attack);
  }

  private readonly position = vec2.create();
  private readonly direction = vec2.create();
  private readonly start = vec2.create();
  private readonly end = vec2.create();

  private attack = ({ entityId, weapon, targetPosition, effects }: Attack) => {
    const entity = this.game.entities.get(entityId)!;
    const spatial = entity.traits.get(Spatial);
    // compensate for entity display offset
    vec2.add(this.position, spatial.position, [0, -0.5]);

    if (weapon.type === Weapon.Type.Fist) {
      const projectile = Projectile.make(
        this.game, entityId, weapon, effects,
        targetPosition, targetPosition, 100, 'sprites/projectiles/invisible');
      this.game.entities.add(projectile);

    } else {
      let duration;
      vec2.sub(this.direction, targetPosition, this.position);

      if (weapon.type === Weapon.Type.Sword) {
        if (vec2.length(this.direction) > weapon.range) {
          vec2.normalize(this.direction, this.direction);
          vec2.scaleAndAdd(targetPosition, this.position, this.direction, weapon.range);
        } else {
          vec2.normalize(this.direction, this.direction);
        }

        vec2.scaleAndAdd(this.start, targetPosition, [this.direction[1], -this.direction[0]], 1);
        vec2.scaleAndAdd(this.end, targetPosition, [-this.direction[1], this.direction[0]], 1);
        duration = 250;
      } else {
        vec2.normalize(this.direction, this.direction);

        vec2.scaleAndAdd(this.start, this.position, this.direction, 1.5);
        vec2.scaleAndAdd(this.end, this.start, this.direction, weapon.range);
        duration = 500;
      }

      const projectile = Projectile.make(
        this.game, entityId, weapon, effects,
        this.start, this.end, duration,
        `sprites/projectiles/${weapon.type}`
      );
      this.game.entities.add(projectile);
    }
  }
}