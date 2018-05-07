import { Game } from 'app/game';
import { ApplyEffects } from 'app/game/messages';
import { Task } from 'app/game/tasks';
import { Inventory, PlayerData } from 'app/game/traits';
import { cloneDeep } from 'lodash';
import { interaction } from 'pixi.js';

const UseItemCooldown = 200;

export class UseItemTask extends Task {
  private pressing = false;
  private elapsed = 0;

  constructor(game: Game) {
    super(game);
    game.view.camera.on('pointerdown', (e: interaction.InteractionEvent) => {
      this.pressing = (e.data.buttons & 2) !== 0;
    });
  }

  update(dt: number) {
    if (this.elapsed <= 0) {
      if (this.pressing) {
        this.useItem();
        this.elapsed = UseItemCooldown;
      }
    } else
      this.elapsed -= dt;
    this.pressing = false;
  }

  private useItem() {
    const { slots } = this.game.player.traits(Inventory);
    const { hotbarSelection } = this.game.player.traits(PlayerData);
    const slot = slots[hotbarSelection];
    if (!slot.item) return;

    const item = slot.item;
    if (item.effects && item.effects.length > 0) {
      const effects = cloneDeep(item.effects);
      this.game.dispatch(new ApplyEffects(this.game.player.id, effects));
      slot.item = null;
    }
  }
}