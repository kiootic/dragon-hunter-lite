import { poissonDisk, rasterizeLine, Noise } from 'worker/mapgen/utils';
import { RandomSeed } from 'random-seed';
import { voronoi, VoronoiDiagram } from 'd3-voronoi';
import { vec2 } from 'gl-matrix';
import { ProgressReporter } from 'worker/mapgen/ProgressReporter';
import { Biome, MapData, RiverSegment } from 'worker/mapgen/data';

const BiomeSize = 32;
const EdgeRoughness = 32;
const EdgeJitter = 8;
const WaterRarity = 16;
const RiverSegments = 16;
const RiverRoughness = 24;

function generateBiomePolygons(map: MapData) {
  const biomeCenters = poissonDisk(map.width, map.height, BiomeSize, map.random);
  const diagram = voronoi()(biomeCenters);

  map.voronoi = diagram;
  map.biomes = biomeCenters.map<Biome>(([x, y]) => ({
    type: Biome.Type.None,
    position: vec2.fromValues(x, y),
    humidity: 0, temperature: 0
  }));
}

function generateHumidity(map: MapData) {
  const sources = poissonDisk(map.width, map.height, BiomeSize * WaterRarity, map.random)
    .map(position => ({ position, level: map.random.floatBetween(0.5, 1) }));

  type WaterPosition = { position: [number, number], level: number };
  const waters: WaterPosition[] = [];
  const rivers: RiverSegment[] = [];
  const riverTheta = new Noise(map.random, 1 / 128, 1);
  for (const { position, level } of sources) {
    let l = level, p = position;
    let theta = map.random.floatBetween(-Math.PI, Math.PI);
    while (p[0] >= 0 && p[0] < map.width && p[1] >= 0 && p[1] < map.height && l > 0.25) {
      waters.push({ position: p, level: l });
      const r = map.random.floatBetween(BiomeSize, BiomeSize * 2);
      const newP: [number, number] = [p[0] + Math.cos(theta) * r, p[1] + Math.sin(theta) * r];
      theta += (riverTheta.noise2D(p[0], p[1]) * 2 - 1) * Math.PI / 4;

      rivers.push({ from: p, to: newP, level: l });
      l *= map.random.floatBetween(0.9, 1);
      p = newP;
    }
  }
  for (const biome of map.biomes) {
    const norm = Math.sqrt(BiomeSize * WaterRarity * BiomeSize * WaterRarity * 2);
    biome.humidity = 0;
    for (const { position, level } of waters) {
      const d = vec2.dist(position, biome.position);
      const h = level * ((d === 0) ? 1 : Math.pow(1 - Math.min(1, d / norm), 2));
      if (h > biome.humidity) biome.humidity = h;
    }
  }
}

function generateTemperature(map: MapData) {
  const temperatureNoise = new Noise(map.random, 0.002, 1);
  for (const biome of map.biomes) {
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
function populateBiomeTypes(map: MapData) {
  for (const biome of map.biomes) {
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

function rasterizeBiomes(map: MapData, report: ProgressReporter) {
  const noiseX = new Noise(map.random, 1 / 32, 4);
  const noiseY = new Noise(map.random, 1 / 32, 4);

  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      const roughnessX = noiseX.noise2D(x, y) * 2 - 1;
      const roughnessY = noiseY.noise2D(x, y) * 2 - 1;
      let px = x + roughnessX * EdgeRoughness;
      let py = y + roughnessY * EdgeRoughness;
      const realBiome = map.biomes[map.voronoi.find(px, py)!.index];
      px += map.random.floatBetween(-EdgeJitter, EdgeJitter);
      py += map.random.floatBetween(-EdgeJitter, EdgeJitter);
      const renderBiome = map.biomes[map.voronoi.find(px, py)!.index];

      let biome = renderBiome;
      if (realBiome.type === Biome.Type.Lake || realBiome.type === Biome.Type.FrozenLake ||
        renderBiome.type === Biome.Type.Lake || renderBiome.type === Biome.Type.FrozenLake)
        biome = realBiome;

      let terrain: string | null = null;
      switch (biome.type) {
        case Biome.Type.FrozenBarren: terrain = 'snow'; break;
        case Biome.Type.Barren: terrain = 'stone'; break;
        case Biome.Type.Desert: terrain = 'sand'; break;
        case Biome.Type.SnowPlain: terrain = 'snow'; break;
        case Biome.Type.Savanna: terrain = 'lightgrass'; break;
        case Biome.Type.Plain: terrain = 'grass'; break;
        case Biome.Type.Taiga: terrain = 'snow'; break;
        case Biome.Type.Forest: terrain = 'deepgrass'; break;
        case Biome.Type.FrozenLake: terrain = 'ice'; break;
        case Biome.Type.Lake: terrain = 'water'; break;
        case Biome.Type.Swamp: terrain = 'mud'; break;
      }
      map.setTerrain(x, y, terrain);
    }
    report(null, y / map.height);
  }

  for (const { from, to, level } of map.rivers) {
    function riverPoint(i: number) {
      let x = from[0] + (to[0] - from[0]) * (i / RiverSegments);
      let y = from[1] + (to[1] - from[1]) * (i / RiverSegments);
      x += Math.floor((noiseX.noise2D(x, y) * 2 - 1) * RiverRoughness);
      y += Math.floor((noiseY.noise2D(x, y) * 2 - 1) * RiverRoughness);
      return [x, y];
    }
    for (let i = 0; i < RiverSegments; i++) {
      const from = riverPoint(i), to = riverPoint(i + 1);
      rasterizeLine(from[0], from[1], to[0], to[1], (x, y) => {
        const size = Math.round(level * 4);
        for (let dy = 0; dy < size; dy++)
          for (let dx = 0; dx < size; dx++)
            map.setTerrain(x + dx, y + dy, 'water');
      });
    }
  }
}

export function generateBiomes(map: MapData, report: ProgressReporter) {
  report('generating biomes...', 0);
  generateBiomePolygons(map);
  generateHumidity(map);
  generateTemperature(map);
  populateBiomeTypes(map);
  rasterizeBiomes(map, report);
  report('done!', 1);
}