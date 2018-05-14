import { InitialPlayer } from 'data/player';
import { GameData } from 'worker/generation/data';
import { ProgressReporter } from 'worker/generation/ProgressReporter';

export function generateProps(data: GameData, report: ProgressReporter) {
  report('generating game data...', 0);
  data.map.seed = data.seed;

  const player = InitialPlayer();
  player.traits.spatial.pos = data.map.spawn;
  data.entities.push(player);
}