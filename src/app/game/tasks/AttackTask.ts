import { TextureSprite } from 'app/components';
import { Game } from 'app/game';
import { ItemDrop } from 'app/game/entities';
import { TileObjectSprite } from 'app/game/interfaces';
import { PlayFX, ShowParticles } from 'app/game/messages';
import { Task } from 'app/game/tasks';
import { Spatial } from 'app/game/traits';
import { direction } from 'app/utils/animations';
import { generateDrops } from 'app/utils/drops';
import { TileObject } from 'common/data';
import { vec2 } from 'gl-matrix';
import { interaction, DisplayObject, Point, RendererPlugins } from 'pixi.js';

const AttackRadius = 2;
const AttackCooldown = 500;

export class AttackTask extends Task {
  private readonly position: vec2;
  private readonly sprite: TextureSprite;
  private attackAnimName = '';

  private pressing = false;
  private readonly interaction: interaction.InteractionManager;
  private readonly cursorPos = new Point();
  private readonly targetTile = vec2.fromValues(-1, -1);
  private readonly targetTileCenter = vec2.create();
  private readonly dir = vec2.create();
  private targetSprite?: TileObjectSprite;

  constructor(game: Game) {
    super(game);
    ({ position: this.position, sprite: this.sprite } = game.player.traits(Spatial));
    this.interaction = (this.game.app.renderer.plugins as RendererPlugins).interaction;

    const handler = (e: interaction.InteractionEvent) => {
      this.cursorPos.copy(e.data.global);
      this.pressing = (e.data.buttons & 1) !== 0;
    };
    game.view.camera.on('pointermove', handler);
    game.view.camera.on('pointerdown', handler);
    game.view.camera.on('pointerup', handler);
    game.view.camera.on('pointerupoutside', handler);
  }

  isTileObject(obj: DisplayObject): obj is TileObjectSprite {
    return obj && !!(obj as any as TileObjectSprite).coords;
  }

  update(dt: number) {
    const obj = this.interaction.hitTest(this.cursorPos, this.game.view.camera);

    if (
      !this.isTileObject(obj) || !vec2.equals(this.targetTile, obj.coords) ||
      !this.pressing || vec2.dist(this.position, this.targetTileCenter) >= AttackRadius
    ) {
      if (this.targetTile[0] >= 0)
        this.endAttack(this.targetTile[0], this.targetTile[1], this.targetSprite!);
      vec2.set(this.targetTile, -1, -1);
      this.targetSprite = undefined;
    }

    if (this.pressing && this.isTileObject(obj) && this.targetTile[0] < 0) {
      vec2.add(this.targetTileCenter, obj.coords, [0.5, 0.5]);
      if (vec2.dist(this.position, this.targetTileCenter) < AttackRadius) {
        if (this.targetTile[0] < 0)
          this.beginAttack(obj.coords[0], obj.coords[1], obj);
        vec2.copy(this.targetTile, obj.coords);
        this.targetSprite = obj;
      }
    }

    if (this.targetTile[0] >= 0) {
      vec2.sub(this.dir, this.targetTileCenter, this.position);
      const dir = direction(this.dir[1], this.dir[0], 'attack');
      this.attackAnimName = `attack-${dir}`;
      this.sprite.animName = dir;
      this.sprite.playActionAnim(this.attackAnimName);
      this.attacking(dt, this.targetSprite!);
    }
  }

  private objHp = 0;
  private obj!: TileObject;
  private cooldown = 0;
  private displayCenter = vec2.create();

  private beginAttack(x: number, y: number, sprite: TileObjectSprite) {
    this.obj = this.game.library.objects[this.game.map.getObject(x, y)];
    if (this.obj.drops) {
      this.objHp = this.obj.drops.hp;
    }
    vec2.add(this.displayCenter, this.targetTileCenter, sprite.jitter);
    this.cooldown = 0;
  }

  private endAttack(x: number, y: number, sprite: TileObjectSprite) {
  }

  private attacking(dt: number, sprite: TileObjectSprite) {
    this.cooldown -= dt;
    if (this.cooldown < 0) {
      this.cooldown = AttackCooldown;
      this.game.dispatch(new PlayFX.Shake(PlayFX.Type.Shake, sprite));
      this.game.dispatch(new ShowParticles(this.displayCenter, 20, parseInt(this.obj.color, 16), 0));
      this.objHp--;
    }

    if (this.obj.drops && this.objHp < 0) {
      for (const drop of generateDrops(this.obj.drops.table)) {
        const itemDrop = ItemDrop.make(this.game, drop, this.displayCenter);
        this.game.entities.add(itemDrop);
      }
      const replacement = this.obj.drops.replaceWith;
      const id = replacement ?
        this.game.library.objects.find(obj => obj && obj.name === replacement)!.id :
        0;
      this.game.map.setObject(this.targetTile[0], this.targetTile[1], id);
    }
  }
}