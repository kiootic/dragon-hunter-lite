import { GameData } from 'worker/generation/data';
import { ProgressReporter } from 'worker/generation/ProgressReporter';

export function generateProps(data: GameData, report: ProgressReporter) {
  report('generating game data...', 0);
  data.player.position = data.map.spawn;
}