import { Game } from 'app/game';
import { ItemDrop } from 'app/game/entities';
import { ObjectSpriteRequest, PlayFX, ShowParticles, TileCollision } from 'app/game/messages';
import { Task } from 'app/game/tasks';
import { ProjectileData } from 'app/game/traits';
import { Spatial } from 'app/game/traits';
import { generateDrops } from 'app/utils/drops';
import { TileObject, Weapon } from 'common/data';
import { vec2 } from 'gl-matrix';

const ObjectHPRegenInterval = 5000;

export class ProjectileTask extends Task {
  constructor(game: Game) {
    super(game);
    game.messages$.ofType(TileCollision).subscribe(this.tileCollided);
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
    if (tileObjDef.obstacle && projectile.weapon.pierce !== true) {
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
}