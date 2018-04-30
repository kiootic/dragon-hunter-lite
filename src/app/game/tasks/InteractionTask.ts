import { TextureSprite } from 'app/components';
import { Game } from 'app/game';
import { TileObjectSprite } from 'app/game/interfaces';
import { PlayEffect } from 'app/game/messages';
import { Task } from 'app/game/tasks';
import { Spatial } from 'app/game/traits';
import { direction } from 'app/utils/animations';
import { TileObject } from 'common/data';
import { vec2 } from 'gl-matrix';
import { interaction, DisplayObject, Point, RendererPlugins } from 'pixi.js';

const InteractionRadius = 3;
const InteractionCooldown = 500;

export class InteractionTask extends Task {
  private readonly position: vec2;
  private readonly sprite: TextureSprite;
  private interactAnimName = '';

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
    game.view.on('pointermove', (e: interaction.InteractionEvent) => {
      this.cursorPos.copy(e.data.global);
    });
    game.view.on('pointerdown', () => this.pressing = true);
    game.view.on('pointerup', () => this.pressing = false);
    game.view.on('pointerupoutside', () => this.pressing = false);
  }

  isTileObject(obj: DisplayObject): obj is TileObjectSprite {
    return obj && !!(obj as any as TileObjectSprite).coords;
  }

  update(dt: number) {
    const obj = this.interaction.hitTest(this.cursorPos, this.game.view);

    if (!this.isTileObject(obj) || !vec2.equals(this.targetTile, obj.coords) || !this.pressing) {
      if (this.targetTile[0] >= 0)
        this.endInteract(this.targetTile[0], this.targetTile[1], this.targetSprite!);
      vec2.set(this.targetTile, -1, -1);
      this.targetSprite = undefined;
    }

    if (this.pressing && this.isTileObject(obj) && this.targetTile[0] < 0) {
      vec2.add(this.targetTileCenter, obj.coords, [0.5, 0.5]);
      if (vec2.dist(this.position, this.targetTileCenter) < InteractionRadius) {
        if (this.targetTile[0] < 0)
          this.beginInteract(obj.coords[0], obj.coords[1], obj);
        vec2.copy(this.targetTile, obj.coords);
        this.targetSprite = obj;
      }
    }

    if (this.targetTile[0] >= 0) {
      vec2.sub(this.dir, this.targetTileCenter, this.position);
      const dir = direction(this.dir[1], this.dir[0], 'interact');
      this.interactAnimName = `interact-${dir}`;
      this.sprite.animName = dir;
      this.sprite.playActionAnim(this.interactAnimName);
      this.interacting(dt, this.targetTile[0], this.targetTile[1], this.targetSprite!);
    } else {
      this.sprite.stopActionAnim(this.interactAnimName);
    }
  }

  private objHp = 0;
  private obj!: TileObject;
  private cooldown = 0;
  private beginInteract(x: number, y: number, sprite: TileObjectSprite) {
    this.obj = this.game.library.objects[this.game.map.getObject(x, y)];
    if (this.obj.drops) {
      this.objHp = this.obj.drops.hp;
    }
  }

  private endInteract(x: number, y: number, sprite: TileObjectSprite) {
  }

  private interacting(dt: number, x: number, y: number, sprite: TileObjectSprite) {
    this.cooldown -= dt;
    if (this.cooldown < 0) {
      console.log(this.objHp);
      this.cooldown = InteractionCooldown;
      this.game.dispatch(new PlayEffect.Shake(PlayEffect.Type.Shake, sprite));
      this.objHp--;
    }

    if (this.objHp <= 0) {
      this.game.map.setObject(x, y, 0);
    }
  }
}