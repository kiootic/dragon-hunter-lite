import { Noise } from 'common/noise';
import { voronoi } from 'd3-voronoi';
import { vec2 } from 'gl-matrix';
import { Biome, GameData, RiverSegment } from 'worker/generation/data';
import { ProgressReporter } from 'worker/generation/ProgressReporter';
import { poissonDisk } from 'worker/generation/utils';

const BiomeSize = 32;
const EdgeRoughness = 16;
const EdgeJitter = 8;
const WaterRarity = 16;

function generateBiomePolygons(data: GameData) {
  const biomeCenters = poissonDisk(data.width, data.height, BiomeSize, data.random);
  const diagram = voronoi()(biomeCenters);

  data.voronoi = diagram;
  data.biomes = biomeCenters.map<Biome>(([x, y], i) => ({
    index: i,
    type: Biome.Type.None,
    feature: Biome.Feature.None,
    position: vec2.fromValues(x, y),
    min: vec2.fromValues(data.width - 1, data.height - 1), max: vec2.fromValues(0, 0),
    humidity: 0, temperature: 0
  }));
}

function generateHumidity(data: GameData) {
  const sources = poissonDisk(data.width, data.height, BiomeSize * WaterRarity, data.random)
    .map(position => ({ position, level: data.random.floatBetween(0.5, 1) }));

  type WaterPosition = { position: [number, number], level: number };
  const waters: WaterPosition[] = [];
  const rivers: RiverSegment[] = [];
  const riverTheta = new Noise(data.random, 1 / 128, 1);
  for (const { position, level } of sources) {
    let l = level, p = position;
    let theta = data.random.floatBetween(-Math.PI, Math.PI);
    while (p[0] >= 0 && p[0] < data.width && p[1] >= 0 && p[1] < data.height && l > 0.25) {
      waters.push({ position: p, level: l });
      const r = data.random.floatBetween(BiomeSize, BiomeSize * 2);
      const newP: [number, number] = [p[0] + Math.cos(theta) * r, p[1] + Math.sin(theta) * r];
      theta += (riverTheta.noise2D(p[0], p[1]) * 2 - 1) * Math.PI / 4;

      rivers.push({ from: p, to: newP, level: l });
      l *= data.random.floatBetween(0.9, 1);
      p = newP;
    }
  }
  for (const biome of data.biomes) {
    const norm = Math.sqrt(BiomeSize * WaterRarity * BiomeSize * WaterRarity * 2);
    biome.humidity = 0;
    for (const { position, level } of waters) {
      const d = vec2.dist(position, biome.position);
      const h = level * ((d === 0) ? 1 : Math.pow(1 - Math.min(1, d / norm), 2));
      if (h > biome.humidity) biome.humidity = h;
    }
  }
  data.rivers = rivers;
}

function generateTemperature(data: GameData) {
  const temperatureNoise = new Noise(data.random, 0.002, 1);
  for (const biome of data.biomes) {
    const temp = temperatureNoise.noise2D(biome.position[0], biome.position[1]) * 2 - 1;
    const t = Math.sign(temp) * Math.pow(Math.abs(temp), 1);
    biome.temperature = (t + 1) / 2;
  }
}

const biomeProps: [Biome.Type, number, number, number][] = [
  [Biome.Type.FrozenBarren, 0.15, 0.2, 1],
  [Biome.Type.Barren, 0, 0.5, 1],
  [Biome.Type.Desert, 0.15, 0.8, 1],

  [Biome.Type.SnowPlain, 0.25, 0.25, 1],
  [Biome.Type.Savanna, 0.25, 0.75, 1],

  [Biome.Type.Plain, 0.5, 0.5, 1],

  [Biome.Type.Taiga, 0.7, 0.25, 1],
  [Biome.Type.Forest, 0.7, 0.75, 1],

  [Biome.Type.FrozenLake, 0.8, 0.25, 1],
  [Biome.Type.Lake, 1, 0.5, 1],
  [Biome.Type.Swamp, 0.8, 0.75, 1],
];
function populateBiomeTypes(data: GameData) {
  for (const biome of data.biomes) {
    let min = Number.MAX_VALUE;
    for (const [type, h, t, w] of biomeProps) {
      const dh = biome.humidity - h, dt = biome.temperature - t;
      const d = 1 / (w * w) * (dh * dh + dt * dt);
      if (d < min) {
        min = d;
        biome.type = type;
      }
    }
  }
}

function rasterizeBiomes(data: GameData, report: ProgressReporter) {
  const noiseX = new Noise(data.random, 1 / 32, 4);
  const noiseY = new Noise(data.random, 1 / 32, 4);

  for (let y = 0; y < data.height; y++) {
    for (let x = 0; x < data.width; x++) {
      const roughnessX = noiseX.noise2D(x, y) * 2 - 1;
      const roughnessY = noiseY.noise2D(x, y) * 2 - 1;
      let px = x + roughnessX * EdgeRoughness;
      let py = y + roughnessY * EdgeRoughness;
      const realBiome = data.biomes[data.voronoi.find(px, py)!.index];
      px += data.random.floatBetween(-EdgeJitter, EdgeJitter);
      py += data.random.floatBetween(-EdgeJitter, EdgeJitter);
      const renderBiome = data.biomes[data.voronoi.find(px, py)!.index];

      let biome = renderBiome;
      if (realBiome.type === Biome.Type.Lake || realBiome.type === Biome.Type.FrozenLake ||
        renderBiome.type === Biome.Type.Lake || renderBiome.type === Biome.Type.FrozenLake)
        biome = realBiome;

      let terrain: string | null = null;
      switch (biome.type) {
        case Biome.Type.FrozenBarren: terrain = 'snow'; break;
        case Biome.Type.Barren: terrain = data.random.range(50) ? 'soil' : 'grass-light'; break;
        case Biome.Type.Desert: terrain = 'sand'; break;
        case Biome.Type.SnowPlain: terrain = 'snow'; break;
        case Biome.Type.Savanna: terrain = 'grass-light'; break;
        case Biome.Type.Plain: terrain = 'grass'; break;
        case Biome.Type.Taiga: terrain = 'snow'; break;
        case Biome.Type.Forest: terrain = 'grass-deep'; break;
        case Biome.Type.FrozenLake: terrain = 'ice'; break;
        case Biome.Type.Lake: terrain = 'water'; break;
        case Biome.Type.Swamp: terrain = data.random.range(5) ? 'mud' : 'grass-deep'; break;
      }
      data.setTerrain(x, y, terrain);
      data.setBiomeIndex(x, y, realBiome.index);
      realBiome.min[0] = Math.min(realBiome.min[0], x);
      realBiome.min[1] = Math.min(realBiome.min[1], y);
      realBiome.max[0] = Math.max(realBiome.max[0], x);
      realBiome.max[1] = Math.max(realBiome.max[1], y);
    }
    report(null, y / data.height);
  }
}

export function generateBiomes(data: GameData, report: ProgressReporter) {
  report('generating biomes...', 0);
  generateBiomePolygons(data);
  generateHumidity(data);
  generateTemperature(data);
  populateBiomeTypes(data);
  rasterizeBiomes(data, report);
}