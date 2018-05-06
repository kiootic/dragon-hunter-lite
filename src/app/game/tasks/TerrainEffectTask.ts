import { UpdateHP } from 'app/game/messages';
import { Task } from 'app/game/tasks';
import { Float, Spatial, Stats } from 'app/game/traits';

export class TerrainEffectTask extends Task {
  private elapsed = 0;
  public update(dt: number) {
    const doDamage = (Math.floor(this.elapsed / 1000) - Math.floor((this.elapsed + dt) / 1000)) !== 0;
    this.elapsed += dt;

    for (const entity of this.game.entities.withTrait(Spatial)) {
      const { position } = entity.traits(Spatial);
      const float = entity.traits(Float);
      if (float && float.z[0] > 0) continue;

      const stats = entity.traits.get(Stats);
      if (!stats) continue;

      const terrainId = this.game.map.getTerrain(position[0], position[1]);
      const terrain = this.game.library.terrains[terrainId];
      if (!terrain) continue;

      if (terrain.speed) {
        stats.boost.spd += terrain.speed;
      }
      if (terrain.damage && doDamage) {
        this.game.dispatch(new UpdateHP(entity.id, -terrain.damage));
      }
    }
  }
}