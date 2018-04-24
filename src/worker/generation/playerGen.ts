import { MapData } from 'worker/generation/data';
import { ProgressReporter } from 'worker/generation/ProgressReporter';

export function generatePlayer(map: MapData, report: ProgressReporter) {
  map.player.position = map.props.spawn;
}