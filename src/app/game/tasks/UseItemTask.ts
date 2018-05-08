import { TextureSprite } from 'app/components';
import { Game } from 'app/game';
import { ApplyEffects, InventoryUpdated } from 'app/game/messages';
import { Attack } from 'app/game/messages';
import { Task } from 'app/game/tasks';
import { Inventory, PlayerData, Spatial } from 'app/game/traits';
import { direction } from 'app/utils/animations';
import { Item, ItemSlot, Weapon } from 'common/data';
import { vec2 } from 'gl-matrix';
import { cloneDeep } from 'lodash';
import { interaction, Point } from 'pixi.js';

const ConsumeCooldown = 200;
const FistRange = 2.5;

type UseType = 'attack' | 'interact' | null;

export class UseItemTask extends Task {
  private type: UseType = null;
  private readonly playerPos: vec2;
  private readonly playerSprite: TextureSprite;
  private readonly data: PlayerData;
  private readonly inventory: ItemSlot[];

  private readonly cursorPos = new Point();

  constructor(game: Game) {
    super(game);
    this.data = game.player.traits.get(PlayerData);
    ({ position: this.playerPos, sprite: this.playerSprite } = game.player.traits.get(Spatial));
    this.inventory = game.player.traits.get(Inventory).slots;

    const handler = (e: interaction.InteractionEvent) => {
      if (e.data.originalEvent.target !== this.game.app.view) {
        this.type = null;
        return;
      }
      e.data.getLocalPosition(this.game.view.camera, this.cursorPos);

      if ((e.data.buttons & 1) !== 0) this.type = 'attack';
      else if ((e.data.buttons & 2) !== 0) this.type = 'interact';
      else this.type = null;
    };
    game.view.camera.on('pointermove', handler);
    game.view.camera.on('pointerdown', handler);
    game.view.camera.on('pointerup', handler);
    game.view.camera.on('pointerupoutside', handler);
  }

  update(dt: number) {
    this.data.consumeCooldown = Math.max(0, this.data.consumeCooldown - dt);
    this.data.attackCooldown = Math.max(0, this.data.attackCooldown - dt);
    if (!this.type)
      return;

    const { hotbarSelection } = this.game.player.traits(PlayerData);
    const slot = this.inventory[hotbarSelection];

    if (this.type === 'interact') {
      this.interact(slot);
    } else if (this.type === 'attack') {
      this.attack(slot);
    }
  }

  private interact(slot: ItemSlot) {
    if (slot.item && slot.item.type === Item.Type.Consumable) {
      if (this.data.consumeCooldown > 0)
        return;
      this.consumeItem(slot.item);
      slot.item = null;
      this.game.dispatch(new InventoryUpdated(slot));
    }
  }

  private consumeItem(item: Item) {
    if (item.effects && item.effects.length > 0) {
      const effects = cloneDeep(item.effects);
      this.game.dispatch(new ApplyEffects(this.game.player.id, effects));
      this.data.consumeCooldown = ConsumeCooldown;
    }
  }

  private readonly coords = vec2.create();
  private readonly direction = vec2.create();
  private attack(slot: ItemSlot) {
    if (this.data.attackCooldown > 0)
      return;

    let item = slot.item;
    // arrow is treated as fist attack
    let weapon = item && item.weapon && item.weapon.type !== Weapon.Type.Arrow ? item.weapon : {
      type: Weapon.Type.Fist,
      strength: 0,
      cooldown: 0,
      knockback: 0,
      range: FistRange,
      color: 'ffffff'
    };

    if (weapon.type === Weapon.Type.Bow) {
      let arrow: Item | undefined;
      for (const slot of this.inventory) {
        const item = slot.item;
        if (item && item.weapon && item.weapon.type === Weapon.Type.Arrow) {
          arrow = item;
          slot.item = null;
          this.game.dispatch(new InventoryUpdated(slot));
          break;
        }
      }
      if (!arrow)
        return;

      item = arrow;
      weapon = {
        type: Weapon.Type.Arrow,
        strength: weapon.strength + arrow.weapon!.strength,
        cooldown: weapon.cooldown + arrow.weapon!.cooldown,
        knockback: weapon.knockback + arrow.weapon!.knockback,
        range: weapon.range + arrow.weapon!.range,
        color: arrow.weapon!.color
      };
    }

    let duration = 500;
    if (weapon.type === Weapon.Type.Spear) duration = Math.min(1000, weapon.cooldown);
    else if (weapon.type !== Weapon.Type.Fist) duration = Math.min(500, weapon.cooldown);
    const effects = item && item.weapon ? (item.effects || []) : [];

    this.game.view.camera.toMapCoords(this.cursorPos, this.coords);
    vec2.sub(this.direction, this.coords, this.playerPos);
    if (weapon.type === Weapon.Type.Fist && vec2.length(this.direction) > weapon.range) {
      // no out of range fist attack
      return;
    }
    vec2.normalize(this.direction, this.direction);

    const animDirection = direction(this.direction[1], this.direction[0], 'attack');
    const animName = `${weapon.type}-${animDirection}`;
    this.playerSprite.animName = animDirection;
    this.playerSprite.playActionAnim(animName, duration);

    this.game.dispatch(new Attack(this.game.player.id, weapon, this.coords, effects));
    this.data.stunDuration = Math.max(this.data.stunDuration, duration);
    this.data.attackCooldown = weapon.cooldown || 500;
  }
}