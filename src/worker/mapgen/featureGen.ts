import { MapData } from 'worker/mapgen/data';
import { poissonDisk } from 'worker/mapgen/utils';
import { ProgressReporter } from 'worker/mapgen/ProgressReporter';

const SubBiomeSize = 128;
const SubBiomeRarity = 4;

function generateSubBiomes(map: MapData) {
  const subbiomePoints = poissonDisk(map.width, map.height, SubBiomeSize, map.random)
    //.filter((_, i) => (i % SubBiomeRarity) === 0);

  for (const [x, y] of subbiomePoints) {
    const biome = map.biomes[map.voronoi.find(x, y)!.index];
    for (let dy = biome.min[1]; dy <= biome.max[1]; dy++)
      for (let dx = biome.min[0]; dx <= biome.max[0]; dx++) {
        if (map.voronoi.find(dx, dy)!.index === biome.index)
          map.setTerrain(dx, dy, 'lava');
      }
  }
}

export function generateFeatures(map: MapData, report: ProgressReporter) {
  report('generating features...', 0);
  generateSubBiomes(map);
}