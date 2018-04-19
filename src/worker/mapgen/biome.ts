import { poissonDisk, rasterizeLine, Noise } from 'worker/mapgen/utils';
import { RandomSeed, create as createRand } from 'random-seed';
import { voronoi, VoronoiDiagram } from 'd3-voronoi';
import OpenSimplexNoise from "open-simplex-noise";
import { vec2 } from 'gl-matrix';
import { Biome } from 'worker/map/Biome';
import { TileMap } from 'worker/map/TileMap';
import { ProgressReporter } from 'worker/mapgen/MapGenerator';

const BiomeSize = 32;
const EdgeRoughness = 32;
const EdgeJitter = 8;
const WaterRarity = 16;
const RiverSegments = 16;
const RiverRoughness = 24;

export interface BiomeMap {
  diagram: VoronoiDiagram<[number, number]>;
  biomes: Biome[];
  rivers: RiverSegment[];
}

export interface RiverSegment {
  from: [number, number];
  to: [number, number];
  level: number;
}

type Humidity = number;
type Temperature = number;

const biomeProps: [Biome.Type, Humidity, Temperature, number][] = [
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
function computeType(humidity: Humidity, temperature: Temperature) {
  let min = 10, type = Biome.Type.None;
  for (const [biome, h, t, w] of biomeProps) {
    const d = 1 / (w * w) * ((humidity - h) * (humidity - h) + (temperature - t) * (temperature - t));
    if (d < min) {
      min = d;
      type = biome;
    }
  }
  return type;
}

type WaterPosition = { position: [number, number], level: number };

export function generateBiomes(rand: RandomSeed, width: number, height: number): BiomeMap {
  const biomeCenters = poissonDisk(width, height, BiomeSize, rand);
  const diagram = voronoi()(biomeCenters);

  const waterSources = poissonDisk(width, height, BiomeSize * WaterRarity, rand)
    .map(position => ({ position, level: rand.floatBetween(0.5, 1) }));

  const waters: WaterPosition[] = [];
  const rivers: RiverSegment[] = [];
  const riverTheta = new Noise(rand, 1 / 128, 1);
  for (const { position, level } of waterSources) {
    let l = level, p = position;
    let theta = rand.floatBetween(-Math.PI, Math.PI);
    while (p[0] >= 0 && p[0] < width && p[1] >= 0 && p[1] < height && l > 0.25) {
      waters.push({ position: p, level: l });
      const r = rand.floatBetween(BiomeSize, BiomeSize * 2);
      const newP: [number, number] = [p[0] + Math.cos(theta) * r, p[1] + Math.sin(theta) * r];
      theta += (riverTheta.noise2D(p[0], p[1]) * 2 - 1) * Math.PI / 4;

      rivers.push({ from: p, to: newP, level: l });
      l *= rand.floatBetween(0.9, 1);
      p = newP;
    }
  }
  const computeHumidity = (x: number, y: number) => {
    const norm = Math.sqrt(BiomeSize * WaterRarity * BiomeSize * WaterRarity * 2);
    let humidity = 0;
    for (const { position, level } of waters) {
      const d = vec2.dist(position, [x, y]);
      const h = level * ((d === 0) ? 1 : Math.pow(1 - Math.min(1, d / norm), 2));
      if (h > humidity) humidity = h;
    }
    return humidity;
  };
  const temperatureNoise = new Noise(rand, 0.002, 1);
  const computeTemp = (x: number, y: number) => {
    const temp = temperatureNoise.noise2D(x, y) * 2 - 1;
    const t = Math.sign(temp) * Math.pow(Math.abs(temp), 1);
    return (t + 1) / 2;
  };

  return {
    biomes: biomeCenters.map(([x, y]) => {
      const humidity = computeHumidity(x, y);
      const temperature = computeTemp(x, y);
      const biome: Biome = {
        type: computeType(humidity, temperature),
        x, y,
        humidity, temperature
      };
      return biome;
    }),
    rivers,
    diagram
  };
}

export function rasterize(biomeMap: BiomeMap, map: TileMap, rand: RandomSeed, reporter: ProgressReporter) {
  const noiseX = new Noise(rand, 1 / 32, 4);
  const noiseY = new Noise(rand, 1 / 32, 4);

  for (let y = 0; y < map.height; y++) {
    for (let x = 0; x < map.width; x++) {
      const roughnessX = noiseX.noise2D(x, y) * 2 - 1;
      const roughnessY = noiseY.noise2D(x, y) * 2 - 1;
      let px = x + roughnessX * EdgeRoughness;
      let py = y + roughnessY * EdgeRoughness;
      const realBiome = biomeMap.biomes[biomeMap.diagram.find(px, py)!.index];
      px += rand.floatBetween(-EdgeJitter, EdgeJitter);
      py += rand.floatBetween(-EdgeJitter, EdgeJitter);
      const renderBiome = biomeMap.biomes[biomeMap.diagram.find(px, py)!.index];

      let biome = renderBiome;
      if (realBiome.type === Biome.Type.Lake || realBiome.type === Biome.Type.FrozenLake)
        biome = realBiome;
      if (renderBiome.type === Biome.Type.Lake || renderBiome.type === Biome.Type.FrozenLake)
        biome = realBiome;

      let type = 0;
      switch (biome.type) {
        case Biome.Type.FrozenBarren: type = 6; break;
        case Biome.Type.Barren: type = 5; break;
        case Biome.Type.Desert: type = 10; break;
        case Biome.Type.SnowPlain: type = 9; break;
        case Biome.Type.Savanna: type = 7; break;
        case Biome.Type.Plain: type = 2; break;
        case Biome.Type.Taiga: type = 9; break;
        case Biome.Type.Forest: type = 3; break;
        case Biome.Type.FrozenLake: type = 6; break;
        case Biome.Type.Lake: type = 1; break;
        case Biome.Type.Swamp: type = 8; break;
      }
      map.setTile(x, y, type, 1);
    }
    reporter(null, y / map.height);
  }

  for (const { from, to, level } of biomeMap.rivers) {
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
            map.setTile(x + dx, y + dy, 1, 0);
      });
    }
  }
}