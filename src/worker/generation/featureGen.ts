import { Noise } from 'common/noise';
import { makeEnemy } from 'data/enemy';
import { vec2 } from 'gl-matrix';
import { Biome, GameData } from 'worker/generation/data';
import { poissonDisk, rasterizeLine, withProgress } from 'worker/generation/utils';
import { ProgressReporter } from 'worker/generation/ProgressReporter';

const FeatureSize = 128;
const EdgeJitter = 4;
const BeachSize = 16;
const RiverSegments = 16;
const RiverRoughness = 24;
const SpawnMargins = 0.2;
const EggSparity = 128;

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
    Biome.Feature.LavaPond,
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

function rasterizeBiome(data: GameData, biome: Biome,
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
      if (data.getBiomeIndex(px, py) === biome.index)
        cb(x, y);
    }
}

function generateBiomeFeatures(data: GameData, report: ProgressReporter) {
  const featurePoints = poissonDisk(data.width, data.height, FeatureSize, data.random);
  const noiseX = new Noise(data.random, 1 / 32, 4);
  const noiseY = new Noise(data.random, 1 / 32, 4);

  for (const [x, y] of withProgress(featurePoints, report)) {
    const biome = data.biomes[data.getBiomeIndex(x, y)];
    const features = featureProps[biome.type];
    if (!features) continue;
    const feature = features[data.random.range(10)];
    if (!feature) continue;

    switch (feature) {
      case Biome.Feature.Pond:
      case Biome.Feature.LavaPond: {
        let terrain: string;
        if (feature === Biome.Feature.LavaPond) terrain = 'lava';
        else terrain = 'water';

        if (terrain === 'water') {
          rasterizeBiome(data, biome,
            (x, y) => data.setTerrain(x, y, 'sand'),
            (x, y) => [
              (noiseX.noise2D(x, y) * 2 - 1) * BeachSize,
              (noiseY.noise2D(x, y) * 2 - 1) * BeachSize
            ]);
        }
        rasterizeBiome(data, biome, (x, y) => data.setTerrain(x, y, terrain));
      } break;
      case Biome.Feature.Oasis: {
        rasterizeBiome(data, biome, (x, y) => data.setTerrain(x, y, 'water'));
        rasterizeBiome(data, biome,
          (x, y) => {
            if (data.getTerrain(x, y) === 'sand' && data.random.range(5) === 0)
              data.setObject(x, y, 'tree-coconut');
          },
          (x, y) => {
            const d = vec2.sub(vec2.create(), [x, y], biome.position);
            vec2.scale(d, vec2.normalize(d, d), EdgeJitter);
            return [-d[0], -d[1]];
          }
        );
      } break;
      case Biome.Feature.Cemetery: {
        rasterizeBiome(data, biome,
          (x, y) => {
            if (data.random.range(3) === 0) {
              data.setTerrain(x, y, 'mud');
              if (data.random.range(10) === 0) data.setObject(x, y, 'cross');
              else if (data.random.range(10) === 0) data.setObject(x, y, 'bones');
            }
          }
        );
        data.entities.push(makeEnemy(data.game.nextEntityId++, data.enemies.spawner, [x, y]));
        data.setObject(x, y, null);
      } break;
      case Biome.Feature.Ruins: {
        rasterizeBiome(data, biome,
          (x, y) => {
            data.setTerrain(x, y, 'stone');
            if (data.random.range(50) === 0)
              data.setObject(x, y, 'pillar');
            else if (data.random.range(50) === 0)
              data.setObject(x, y, 'bones');
          },
          (x, y) => [
            data.random.intBetween(-EdgeJitter, EdgeJitter),
            data.random.intBetween(-EdgeJitter, EdgeJitter)
          ]
        );
        data.entities.push(makeEnemy(data.game.nextEntityId++, data.enemies.spawner, [x, y]));
        data.setObject(x, y, null);
      } break;
    }
    biome.feature = feature;
    if (feature === Biome.Feature.Floral || feature === Biome.Feature.Rocky) {
      let neighbor: Biome;
      if (neighbor = data.biomes[data.getBiomeIndex(x - FeatureSize, y)])
        neighbor.feature = feature;
      if (neighbor = data.biomes[data.getBiomeIndex(x + FeatureSize, y)])
        neighbor.feature = feature;
      if (neighbor = data.biomes[data.getBiomeIndex(x, y - FeatureSize)])
        neighbor.feature = feature;
      if (neighbor = data.biomes[data.getBiomeIndex(x, y + FeatureSize)])
        neighbor.feature = feature;
    }
  }

  const spawnMargins = [data.width * SpawnMargins, data.height * SpawnMargins];
  let spawnBiome: Biome;
  do {
    spawnBiome = data.biomes[data.getBiomeIndex(
      data.random.intBetween(spawnMargins[0], data.width - spawnMargins[0]),
      data.random.intBetween(spawnMargins[1], data.width - spawnMargins[1])
    )];
  } while (
    spawnBiome.feature !== Biome.Feature.None &&
    spawnBiome.type !== Biome.Type.Lake &&
    spawnBiome.type !== Biome.Type.FrozenLake);

  spawnBiome.feature = Biome.Feature.Spawn;
  data.map.spawn = [spawnBiome.position[0], spawnBiome.position[1]];
}

function rasterizeRivers(data: GameData, report: ProgressReporter) {
  const noiseX = new Noise(data.random, 1 / 32, 4);
  const noiseY = new Noise(data.random, 1 / 32, 4);

  for (const { from, to, level } of withProgress(data.rivers, report)) {
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
      const biomeA = data.biomes[data.getBiomeIndex(from[0], from[1])];
      const biomeB = data.biomes[data.getBiomeIndex(to[0], to[1])];
      const terrain = isFrozen(biomeA) && isFrozen(biomeB) ? 'ice' : 'water';
      rasterizeLine(from[0], from[1], to[0], to[1], (x, y) => {
        const size = Math.round(level * 4);
        for (let dy = 0; dy < size; dy++)
          for (let dx = 0; dx < size; dx++) {
            if (data.getTerrain(x + dx, y + dy) !== 'water')
              data.setTerrain(x + dx, y + dy, terrain);
            data.setObject(x + dx, y + dy, null);
          }
      });
    }
  }
}

function generateEggs(data: GameData, report: ProgressReporter) {
  const locations = poissonDisk(data.width, data.height, EggSparity, data.random);
  const spawn = data.map.spawn;
  for (const location of locations) {
    const dx = location[0] - spawn[0], dy = location[1] - spawn[1];
    // should not be too close to spawn
    if (dx * dx + dy * dy < 64 * 64)
      continue;
    data.entities.push(makeEnemy(data.game.nextEntityId++, data.enemies.egg, location));
    data.setObject(location[0], location[1], null);
  }
}

export function generateFeatures(data: GameData, report: ProgressReporter) {
  report('generating features...', 0);
  generateBiomeFeatures(data, report);
  rasterizeRivers(data, report);
  generateEggs(data, report);
}