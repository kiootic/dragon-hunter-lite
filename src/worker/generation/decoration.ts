import { MapData, Biome } from 'worker/generation/data';
import { ProgressReporter } from 'worker/generation/ProgressReporter';

const decorationProps: { [type: number]: [string, number][] } = {
  [Biome.Type.FrozenBarren]: [
    ['stone', 0.02],
    ['rocks', 0.02],
  ],
  [Biome.Type.Barren]: [
    ['stone', 0.02],
    ['rocks', 0.02],
  ],
  [Biome.Type.Desert]: [
    ['tree-coconut', 0.001],
    ['stone', 0.01],
    ['rocks', 0.01],
    ['cactus', 0.01],
  ],
  [Biome.Type.SnowPlain]: [
    ['berries', 0.002],
    ['flower', 0.005],
    ['tree-spruce', 0.005],
    ['bush', 0.008],
    ['rocks', 0.01],
    ['fern', 0.05],
  ],
  [Biome.Type.Savanna]: [
    ['berries', 0.004],
    ['flower', 0.005],
    ['tree-oak', 0.005],
    ['bush', 0.006],
    ['fern', 0.1],
  ],
  [Biome.Type.Plain]: [
    ['bush', 0.004],
    ['tree-oak', 0.005],
    ['berries', 0.006],
    ['rocks', 0.01],
    ['flower', 0.02],
    ['fern', 0.4],
  ],
  [Biome.Type.Taiga]: [
    ['rocks', 0.001],
    ['berries', 0.003],
    ['flower', 0.005],
    ['bush', 0.007],
    ['fern', 0.05],
    ['tree-spruce', 0.1],
  ],
  [Biome.Type.Forest]: [
    ['rocks', 0.001],
    ['bush', 0.004],
    ['flower', 0.005],
    ['berries', 0.006],
    ['fern', 0.05],
    ['tree-oak', 0.1],
  ],
  [Biome.Type.Swamp]: [
    ['rocks', 0.001],
    ['fern', 0.05],
  ],
};

export function decorateMap(map: MapData, report: ProgressReporter) {
  report('decorating map...', 0);
  const flowers = map.library.objects
    .filter(obj => obj && /^flower-\d+$/.test(obj.name))
    .map(obj => obj.name);
  const berries = map.library.objects
    .filter(obj => obj && /^berrybush-\d+$/.test(obj.name))
    .map(obj => obj.name);

  function decorateTile(x: number, y: number, map: MapData) {
    if (map.getObject(x, y)) return;
    const terrain = map.getTerrain(x, y);
    if (terrain === 'water' || terrain === 'lava' || terrain === 'ice') return;

    const biome = map.biomes[map.getBiomeIndex(x, y)];
    const decorations = decorationProps[biome.type];
    if (!decorations) return;
    if (
      biome.feature !== Biome.Feature.None &&
      biome.feature !== Biome.Feature.Floral &&
      biome.feature !== Biome.Feature.Rocky
    )
      return;

    let r = map.random.random();
    for (const [decor, prob] of decorations) {
      r -= prob;
      if (biome.feature === Biome.Feature.Floral && decor === 'flower')
        r -= 0.1;
      else if (biome.feature === Biome.Feature.Rocky && decor == 'rocks')
        r -= 0.1;

      if (r <= 0) {
        if (decor === 'flower')
          map.setObject(x, y, flowers[map.random.range(flowers.length)]);
        else if (decor === 'berries')
          map.setObject(x, y, berries[map.random.range(berries.length)]);
        else
          map.setObject(x, y, decor);
        break;
      }
    }
  }

  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++)
      decorateTile(x, y, map);
    report(null, y / map.height);
  }
}