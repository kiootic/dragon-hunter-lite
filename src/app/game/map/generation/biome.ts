import { poissonDisk, Noise } from "app/game/map/utils";
import { RandomSeed, create as createRand } from "random-seed";
import { voronoi, VoronoiDiagram } from 'd3-voronoi';
import OpenSimplexNoise from "open-simplex-noise";
import { vec2 } from "gl-matrix";
import { Biome } from "app/game/map/Biome";
import { TileMap } from "app/game/map/TileMap";

const BiomeSize = 32;
const EdgeSizeRoughness = 8;
const EdgeJitter = 4;
const WaterRarity = 16;

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

  [Biome.Type.FrozenLake, 0.85, 0, 2],
  [Biome.Type.Lake, 1, 0.5, 1],
  [Biome.Type.Swamp, 0.85, 1, 2],
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
        type: computeType(x / width, y / height),
        x, y,
        humidity, temperature
      };
      return biome;
    }),
    rivers,
    diagram
  };
}

function line(x0: number, y0: number, x1: number, y1: number, cb: (x: number, y: number) => void) {
  x0 = Math.floor(x0); y0 = Math.floor(y0);
  x1 = Math.floor(x1); y1 = Math.floor(y1);

  const dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
  const sx = Math.sign(x1 - x0), sy = Math.sign(y1 - y0);
  let err = dx - dy;
  cb(x0, y0);
  while (x0 !== x1 || y0 !== y1) {
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    } else {
      err += dx;
      y0 += sy;
    }
    cb(x0, y0);
  }
}

export function rasterize(biomeMap: BiomeMap, map: TileMap, rand: RandomSeed) {
  const noiseX = new Noise(rand, 1 / 32, 4);
  const noiseY = new Noise(rand, 1 / 32, 4);

  for (let y = 0; y < map.height; y++)
    for (let x = 0; x < map.width; x++) {
      const roughnessX = noiseX.noise2D(x, y) * 2 - 1;
      const roughnessY = noiseY.noise2D(x, y) * 2 - 1;
      const px = x + roughnessX * EdgeSizeRoughness + rand.intBetween(-EdgeJitter, EdgeJitter);
      const py = y + roughnessY * EdgeSizeRoughness + rand.intBetween(-EdgeJitter, EdgeJitter);

      const site = biomeMap.diagram.find(px, py)!;
      let type = 0;
      switch (biomeMap.biomes[site.index].type) {
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
      map.setTile(x, y, type, 0);
    }

  for (const { from, to, level } of biomeMap.rivers) {
    line(from[0], from[1], to[0], to[1], (x, y) => {
      x += Math.floor((noiseX.noise2D(x, y) * 2 - 1) * EdgeSizeRoughness);
      y += Math.floor((noiseY.noise2D(x, y) * 2 - 1) * EdgeSizeRoughness);

      const size = Math.round(level * 4);
      for (let dy = 0; dy < size; dy++)
      for (let dx = 0; dx < size; dx++)
        map.setTile(x + dx, y + dy, 1, 0);
    });
  }
}