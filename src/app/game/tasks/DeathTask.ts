import { Game } from 'app/game';
import { ItemDrop } from 'app/game/entities';
import { Death } from 'app/game/messages';
import { DeathOverlay } from 'app/game/overlays';
import { Task } from 'app/game/tasks';
import { EnemyData, PlayerData, Spatial } from 'app/game/traits';
import { StateOverlay } from 'app/states';
import { generateDrops } from 'app/utils/drops';

export class DeathTask extends Task {
  constructor(game: Game) {
    super(game);
    this.game.messages$.ofType(Death).subscribe(this.death);
  }

  private death = ({ entityId }: Death) => {
    const entity = this.game.entities.get(entityId);
    if (!entity) return;

    const enemy = entity.traits.get(EnemyData);
    if (enemy) {
      const { position } = entity.traits.get(Spatial);
      for (const drop of generateDrops(enemy.def.drops)) {
        const itemDrop = ItemDrop.make(this.game, drop, position);
        this.game.entities.add(itemDrop);
      }
      entity.delete();
      return;
    }

    const player = entity.traits.get(PlayerData);
    if (player) {
      this.game.app.pushState(new StateOverlay(new DeathOverlay(this.game)));
    }
  }
}