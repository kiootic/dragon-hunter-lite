import { Game } from 'app/game';
import { ItemDrop } from 'app/game/entities';
import { ApplyEffects, EntityCollision, ObjectSpriteRequest, PlayFX, ShowParticles, TileCollision } from 'app/game/messages';
import { Task } from 'app/game/tasks';
import { ProjectileData, Stats } from 'app/game/traits';
import { Spatial } from 'app/game/traits';
import { generateDrops } from 'app/utils/drops';
import { Effect, TileObject, Weapon } from 'common/data';
import { makeEffect } from 'common/logic/effect/common';
import { EffectDef } from 'data/effects';
import { vec2 } from 'gl-matrix';

const ObjectHPRegenInterval = 5000;

export class ProjectileTask extends Task {
  constructor(game: Game) {
    super(game);
    game.messages$.ofType(TileCollision).subscribe(this.tileCollided);
    game.messages$.ofType(EntityCollision).subscribe(this.entityCollided);
  }

  private regenCooldown = 0;
  private readonly objectDamages = new Map<string, number>();

  private readonly target = vec2.create();
  update(dt: number) {
    for (const entity of this.game.entities.withTrait(ProjectileData)) {
      const projectile = entity.traits.get(ProjectileData);
      if (entity.age >= projectile.lifetime) {
        entity.delete();
        continue;
      }
      const spatial = entity.traits.get(Spatial);
      spatial.sprite.visible = entity.age > 100;

      // update velocity
      vec2.sub(this.target, projectile.end, projectile.start);
      vec2.scaleAndAdd(this.target, projectile.start, this.target, entity.age / projectile.lifetime);
      vec2.sub(spatial.velocity, this.target, spatial.position);
      vec2.scale(spatial.velocity, spatial.velocity, 1000 / dt);
    }

    this.regenCooldown += dt;
    if (this.regenCooldown >= ObjectHPRegenInterval) {
      for (const key of this.objectDamages.keys()) {
        const dmg = (this.objectDamages.get(key) || 0) - 1;
        if (dmg <= 0)
          this.objectDamages.delete(key);
        else
          this.objectDamages.set(key, dmg);
      }
      this.regenCooldown = 0;
    }
  }

  private tileCollided = ({ entityId, x, y }: TileCollision) => {
    const entity = this.game.entities.get(entityId);
    if (!entity) return;
    const projectile = entity.traits.get(ProjectileData);
    if (!projectile) return;

    const tileObj = this.game.map.getObject(x, y);
    const tileObjDef = this.game.library.objects[tileObj];
    if (!tileObjDef) return;

    if (tileObjDef.drops && (projectile.weapon.type !== Weapon.Type.Arrow || tileObjDef.obstacle)) {
      this.hitObject(projectile, x, y, tileObjDef);
    }
    if (tileObjDef.obstacle && !projectile.weapon.pierce) {
      entity.delete();
    }
  }

  private readonly objectCenter = vec2.create();
  private hitObject(projectile: ProjectileData, x: number, y: number, obj: TileObject) {
    const key = `${x}:${y}`;
    if (projectile.hit.has(key)) return;
    else projectile.hit.add(key);

    const sprite = this.game.dispatch(new ObjectSpriteRequest(x, y)).sprite;
    vec2.set(this.objectCenter, x + 0.5, y + 0.5);
    if (sprite) {
      vec2.add(this.objectCenter, this.objectCenter, sprite.jitter);
      this.game.dispatch(new PlayFX.Shake(PlayFX.Type.Shake, sprite));
      this.game.dispatch(ShowParticles.splash(this.objectCenter, 20, parseInt(obj.color, 16), 0));
    }

    const damage = (this.objectDamages.get(key) || 0) + 1;
    const drops = obj.drops!;
    if (damage <= drops.hp) {
      this.objectDamages.set(key, damage);
      return;
    }

    this.objectDamages.delete(key);
    for (const drop of generateDrops(drops.table)) {
      const itemDrop = ItemDrop.make(this.game, drop, this.objectCenter);
      this.game.entities.add(itemDrop);
    }
    const replacement = drops.replaceWith;
    const id = replacement ?
      this.game.library.objects.find(obj => obj && obj.name === replacement)!.id :
      0;
    this.game.map.setObject(x, y, id);
  }

  private readonly knockbackDirection = vec2.create();
  private entityCollided = ({ entityIdA, entityIdB }: EntityCollision) => {
    const entityA = this.game.entities.get(entityIdA);
    const entityB = this.game.entities.get(entityIdB);
    if (!entityA || !entityB) return;

    let projectile: ProjectileData, stats: Stats;
    let projectileEntity, targetEntity;
    if ((projectile = entityA.traits.get(ProjectileData)) && (stats = entityB.traits.get(Stats))) {
      projectileEntity = entityA;
      targetEntity = entityB;
    } else if ((projectile = entityB.traits.get(ProjectileData)) && (stats = entityA.traits.get(Stats))) {
      projectileEntity = entityB;
      targetEntity = entityA;
    } else return;

    const key = `${targetEntity.id}`;
    if (projectile.hit.has(key)) return;
    else projectile.hit.add(key);

    // only hits opposing entities
    if (projectile.sourceEntityId !== this.game.player.id && targetEntity !== this.game.player)
      return;
    if (projectile.sourceEntityId === this.game.player.id && targetEntity === this.game.player)
      return;

    const effects: Effect[] = [];

    // knockback
    vec2.sub(this.knockbackDirection, projectile.end, projectile.start);
    vec2.normalize(this.knockbackDirection, this.knockbackDirection);
    if (projectile.weapon.type === Weapon.Type.Sword)
      vec2.set(this.knockbackDirection, this.knockbackDirection[1], -this.knockbackDirection[0]);
    const { velocity: targetVel } = targetEntity.traits.get(Spatial);
    vec2.scale(targetVel, this.knockbackDirection, 5 + projectile.weapon.knockback * 1.5);
    effects.push(makeEffect(EffectDef.Type.Knockback, 0, 100));

    this.game.dispatch(new ApplyEffects(targetEntity.id, effects));

    if (!projectile.weapon.pierce) {
      projectileEntity.delete();
    }
  }
}