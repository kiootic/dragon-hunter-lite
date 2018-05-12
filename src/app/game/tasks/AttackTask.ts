import { Game } from 'app/game';
import { Projectile } from 'app/game/entities/Projectile';
import { ApplyEffects, Attack } from 'app/game/messages';
import { Task } from 'app/game/tasks';
import { Spatial } from 'app/game/traits';
import { Weapon } from 'common/data';
import { makeEffect } from 'common/logic/effect/common';
import { EffectDef } from 'data/effects';
import { vec2 } from 'gl-matrix';

export class AttackTask extends Task {
  constructor(game: Game) {
    super(game);
    game.messages$.ofType(Attack).subscribe(this.attack);
  }

  private readonly direction = vec2.create();
  private readonly start = vec2.create();
  private readonly end = vec2.create();

  private attack = ({ entityId, weapon, targetPosition, effects }: Attack) => {
    const entity = this.game.entities.get(entityId);
    if (!entity) return;

    const { position } = entity.traits.get(Spatial);
    vec2.sub(this.direction, targetPosition, position);

    let stunDuration;
    if (weapon.type === Weapon.Type.Fist) {
      vec2.scaleAndAdd(this.start, targetPosition, this.direction, -0.5);
      vec2.copy(this.end, targetPosition);

      const projectile = Projectile.make(
        this.game, entityId, weapon, effects,
        this.start, this.end, 100, 'sprites/projectiles/invisible');
      this.game.entities.add(projectile);
      stunDuration = 500;

    } else {
      let duration;

      if (weapon.type === Weapon.Type.Sword) {
        if (vec2.length(this.direction) > weapon.range) {
          vec2.normalize(this.direction, this.direction);
          vec2.scaleAndAdd(targetPosition, position, this.direction, weapon.range);
        } else {
          vec2.normalize(this.direction, this.direction);
        }

        vec2.scaleAndAdd(this.start, targetPosition, [this.direction[1], -this.direction[0]], 1);
        vec2.scaleAndAdd(this.end, targetPosition, [-this.direction[1], this.direction[0]], 1);
        duration = 250;
      } else {
        vec2.normalize(this.direction, this.direction);

        vec2.copy(this.start, position);
        vec2.scaleAndAdd(this.end, this.start, this.direction, weapon.range);
        duration = 500;
      }
      stunDuration = Math.min(weapon.type === Weapon.Type.Spear ? 1000 : 500, weapon.cooldown);

      const projectile = Projectile.make(
        this.game, entityId, weapon, effects,
        this.start, this.end, duration,
        `sprites/projectiles/${weapon.type}`
      );
      this.game.entities.add(projectile);
    }

    if (entity === this.game.player) {
      this.game.dispatch(new ApplyEffects(entity.id, [
        makeEffect(EffectDef.Type.Stunned, 0, stunDuration)
      ]));
    }
  }
}