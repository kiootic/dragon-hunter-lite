import { Game } from 'app/game';
import { ApplyEffects } from 'app/game/messages';
import { Task } from 'app/game/tasks';
import { Inventory, PlayerData } from 'app/game/traits';
import { cloneDeep } from 'lodash';
import { interaction } from 'pixi.js';

const UseItemCooldown = 500;

export class UseItemTask extends Task {
  private pressing = false;
  private elapsed = 0;

  constructor(game: Game) {
    super(game);
    const handler = (e: interaction.InteractionEvent) => {
      this.pressing = (e.data.buttons & 2) !== 0;
    };
    game.view.on('pointermove', handler);
    game.view.on('pointerdown', handler);
    game.view.on('pointerup', handler);
    game.view.on('pointerupoutside', handler);
  }

  update(dt: number) {
    if (this.elapsed <= 0) {
      if (this.pressing) {
        this.useItem();
        this.elapsed = UseItemCooldown;
      }
    } else
      this.elapsed -= dt;
  }

  private useItem() {
    const { slots } = this.game.player.traits(Inventory);
    const { hotbarSelection } = this.game.player.traits(PlayerData);
    const slot = slots[hotbarSelection];
    if (!slot.item) return;

    const item = slot.item;
    if (item.effects) {
      const effects = cloneDeep(item.effects);
      this.game.dispatch(new ApplyEffects(this.game.player.id, effects));
      slot.item = null;
    }
  }
}