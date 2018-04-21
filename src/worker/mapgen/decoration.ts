import { MapData, Biome } from 'worker/mapgen/data';
import { ProgressReporter } from 'worker/mapgen/ProgressReporter';

const flowers = [
  'flower1', 'flower2', 'flower3', 'flower4'
];
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
    ['stone', 0.01],
    ['rocks', 0.01],
    ['cactus', 0.01],
    ['tree-coconut', 0.001],
  ],
  [Biome.Type.SnowPlain]: [
    ['flower', 0.005],
    ['tree-spruce', 0.005],
    ['bush', 0.01],
    ['rocks', 0.01],
    ['fern', 0.05],
  ],
  [Biome.Type.Savanna]: [
    ['flower', 0.005],
    ['bush', 0.005],
    ['tree-oak', 0.005],
    ['fern', 0.1],
  ],
  [Biome.Type.Plain]: [
    ['tree-oak', 0.005],
    ['bush', 0.01],
    ['rocks', 0.01],
    ['flower', 0.02],
    ['fern', 0.4],
  ],
  [Biome.Type.Taiga]: [
    ['rocks', 0.001],
    ['flower', 0.005],
    ['bush', 0.01],
    ['tree-spruce', 0.1],
    ['fern', 0.05],
  ],
  [Biome.Type.Forest]: [
    ['rocks', 0.001],
    ['flower', 0.005],
    ['bush', 0.01],
    ['fern', 0.05],
    ['tree-oak', 0.1],
  ],
  [Biome.Type.Swamp]: [
    ['rocks', 0.001],
    ['fern', 0.05],
  ],
};

function decorateTile(x: number, y: number, map: MapData) {
  if (map.getObject(x, y)) return;
  const terrain = map.getTerrain(x, y);
  if (terrain === 'water' || terrain === 'lava') return;

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
      else
        map.setObject(x, y, decor);
      break;
    }
  }
}

export function decorateMap(map: MapData, report: ProgressReporter) {
  report('decorating map...', 0);
  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++)
      decorateTile(x, y, map);
    report(null, y / map.height);
  }
}