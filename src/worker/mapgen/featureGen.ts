import { MapData, Biome } from 'worker/mapgen/data';
import { poissonDisk, rasterizeLine, withProgress } from 'worker/mapgen/utils';
import { ProgressReporter } from 'worker/mapgen/ProgressReporter';
import { Noise } from 'common/noise';
import { vec2 } from 'gl-matrix';

const FeatureSize = 128;
const EdgeJitter = 4;
const BeachSize = 16;
const RiverSegments = 16;
const RiverRoughness = 24;

const featureProps: { [type: number]: Biome.Feature[] } = {
  [Biome.Type.Barren]: [
    Biome.Feature.LavaPond,
    Biome.Feature.LavaPond,
    Biome.Feature.Rocky,
    Biome.Feature.Cemetery,
    Biome.Feature.Cemetery,
    Biome.Feature.Ruins,
  ],
  [Biome.Type.FrozenBarren]: [
    Biome.Feature.Rocky,
    Biome.Feature.Rocky,
    Biome.Feature.Cemetery,
    Biome.Feature.Cemetery,
    Biome.Feature.Cemetery,
    Biome.Feature.Ruins,
  ],
  [Biome.Type.Desert]: [
    Biome.Feature.LavaPond,
    Biome.Feature.Rocky,
    Biome.Feature.Rocky,
    Biome.Feature.Oasis,
    Biome.Feature.Oasis,
    Biome.Feature.Oasis,
    Biome.Feature.Cemetery,
  ],
  [Biome.Type.SnowPlain]: [
    Biome.Feature.Pond,
    Biome.Feature.Floral,
    Biome.Feature.Floral,
    Biome.Feature.Rocky,
    Biome.Feature.Cemetery,
    Biome.Feature.Ruins,
  ],
  [Biome.Type.Savanna]: [
    Biome.Feature.Pond,
    Biome.Feature.Pond,
    Biome.Feature.Floral,
    Biome.Feature.Floral,
    Biome.Feature.Rocky,
    Biome.Feature.Ruins,
  ],
  [Biome.Type.Plain]: [
    Biome.Feature.Pond,
    Biome.Feature.Pond,
    Biome.Feature.Pond,
    Biome.Feature.Floral,
    Biome.Feature.Floral,
    Biome.Feature.Rocky,
    Biome.Feature.Ruins,
  ],
  [Biome.Type.Taiga]: [
    Biome.Feature.Pond,
    Biome.Feature.Pond,
    Biome.Feature.Pond,
    Biome.Feature.Floral,
    Biome.Feature.Floral,
    Biome.Feature.Floral,
    Biome.Feature.Ruins,
  ],
  [Biome.Type.Forest]: [
    Biome.Feature.Pond,
    Biome.Feature.Pond,
    Biome.Feature.Pond,
    Biome.Feature.Floral,
    Biome.Feature.Floral,
    Biome.Feature.Floral,
    Biome.Feature.Ruins,
  ],
  [Biome.Type.Swamp]: [
    Biome.Feature.Pond,
    Biome.Feature.Rocky,
    Biome.Feature.Rocky,
    Biome.Feature.Cemetery,
    Biome.Feature.Cemetery,
  ],
};

function rasterizeBiome(map: MapData, biome: Biome,
  cb: (x: number, y: number) => void,
  offset?: (x: number, y: number) => [number, number]
) {
  for (let y = biome.min[1] - EdgeJitter; y <= biome.max[1] + EdgeJitter; y++)
    for (let x = biome.min[0] - EdgeJitter; x <= biome.max[0] + EdgeJitter; x++) {
      let px = x, py = y;
      if (offset) {
        const [dx, dy] = offset(x, y);
        px += dx;
        py += dy;
      }
      if (map.getBiomeIndex(px, py) === biome.index)
        cb(x, y);
    }
}

function generateBiomeFeatures(map: MapData, report: ProgressReporter) {
  const featurePoints = poissonDisk(map.width, map.height, FeatureSize, map.random);
  const noiseX = new Noise(map.random, 1 / 32, 4);
  const noiseY = new Noise(map.random, 1 / 32, 4);

  for (const [x, y] of withProgress(featurePoints, report)) {
    const biome = map.biomes[map.getBiomeIndex(x, y)];
    const features = featureProps[biome.type];
    if (!features) continue;
    const feature = features[map.random.range(10)];
    if (!feature) continue;

    switch (feature) {
      case Biome.Feature.Pond:
      case Biome.Feature.LavaPond: {
        let terrain: string;
        if (feature === Biome.Feature.LavaPond) terrain = 'lava';
        else terrain = 'water';

        if (terrain === 'water') {
          rasterizeBiome(map, biome,
            (x, y) => map.setTerrain(x, y, 'sand'),
            (x, y) => [
              (noiseX.noise2D(x, y) * 2 - 1) * BeachSize,
              (noiseY.noise2D(x, y) * 2 - 1) * BeachSize
            ]);
        }
        rasterizeBiome(map, biome, (x, y) => map.setTerrain(x, y, terrain));
      } break;
      case Biome.Feature.Oasis: {
        rasterizeBiome(map, biome, (x, y) => map.setTerrain(x, y, 'water'));
        rasterizeBiome(map, biome,
          (x, y) => {
            if (map.getTerrain(x, y) === 'sand' && map.random.range(5) === 0)
              map.setObject(x, y, 'tree-coconut');
          },
          (x, y) => {
            const d = vec2.sub(vec2.create(), [x, y], biome.position);
            vec2.scale(d, vec2.normalize(d, d), EdgeJitter);
            return [-d[0], -d[1]];
          }
        );
      } break;
      case Biome.Feature.Cemetery: {
        rasterizeBiome(map, biome,
          (x, y) => {
            if (map.random.range(3) === 0) {
              map.setTerrain(x, y, 'mud');
              if (map.random.range(10) === 0) map.setObject(x, y, 'cross');
              else if (map.random.range(10) === 0) map.setObject(x, y, 'bones');
            }
          }
        );
      } break;
      case Biome.Feature.Ruins: {
        rasterizeBiome(map, biome,
          (x, y) => {
            map.setTerrain(x, y, 'stone');
            if (map.random.range(50) === 0)
              map.setObject(x, y, 'pillar');
            else if (map.random.range(50) === 0)
              map.setObject(x, y, 'bones');
          },
          (x, y) => [
            map.random.intBetween(-EdgeJitter, EdgeJitter),
            map.random.intBetween(-EdgeJitter, EdgeJitter)
          ]
        );
      } break;
    }
    biome.feature = feature;
    if (feature === Biome.Feature.Floral || feature === Biome.Feature.Rocky) {
      let neighbor: Biome;
      if (neighbor = map.biomes[map.getBiomeIndex(x - FeatureSize, y)])
        neighbor.feature = feature;
      if (neighbor = map.biomes[map.getBiomeIndex(x + FeatureSize, y)])
        neighbor.feature = feature;
      if (neighbor = map.biomes[map.getBiomeIndex(x, y - FeatureSize)])
        neighbor.feature = feature;
      if (neighbor = map.biomes[map.getBiomeIndex(x, y + FeatureSize)])
        neighbor.feature = feature;
    }
  }
}

function rasterizeRivers(map: MapData, report: ProgressReporter) {
  const noiseX = new Noise(map.random, 1 / 32, 4);
  const noiseY = new Noise(map.random, 1 / 32, 4);

  for (const { from, to, level } of withProgress(map.rivers, report)) {
    function riverPoint(i: number) {
      let x = from[0] + (to[0] - from[0]) * (i / RiverSegments);
      let y = from[1] + (to[1] - from[1]) * (i / RiverSegments);
      x += Math.floor((noiseX.noise2D(x, y) * 2 - 1) * RiverRoughness);
      y += Math.floor((noiseY.noise2D(x, y) * 2 - 1) * RiverRoughness);
      return [x, y];
    }
    function isFrozen(biome: Biome) {
      if (!biome) return false;
      switch (biome.type) {
        case Biome.Type.FrozenLake:
        case Biome.Type.FrozenBarren:
        case Biome.Type.SnowPlain:
        case Biome.Type.Taiga:
          return true;
      }
      return false;
    }
    for (let i = 0; i < RiverSegments; i++) {
      const from = riverPoint(i), to = riverPoint(i + 1);
      const biomeA = map.biomes[map.getBiomeIndex(from[0], from[1])];
      const biomeB = map.biomes[map.getBiomeIndex(to[0], to[1])];
      const terrain = isFrozen(biomeA) && isFrozen(biomeB) ? 'ice' : 'water';
      rasterizeLine(from[0], from[1], to[0], to[1], (x, y) => {
        const size = Math.round(level * 4);
        for (let dy = 0; dy < size; dy++)
          for (let dx = 0; dx < size; dx++) {
            if (map.getTerrain(x + dx, y + dy) !== 'water')
              map.setTerrain(x + dx, y + dy, terrain);
            map.setObject(x + dx, y + dy, null);
          }
      });
    }
  }
}

export function generateFeatures(map: MapData, report: ProgressReporter) {
  report('generating features...', 0);
  generateBiomeFeatures(map, report);
  rasterizeRivers(map, report);
}