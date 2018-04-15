import { poissonDisk, Noise } from "app/game/map/utils";
import { RandomSeed, create as createRand } from "random-seed";
import { voronoi, VoronoiDiagram } from 'd3-voronoi';
import { Biome } from "app/game/map/Biome";
import { TileMap } from "app/game/map/TileMap";
import OpenSimplexNoise from "open-simplex-noise";
import { vec2 } from "gl-matrix";

const BiomeSize = 64;
const WaterRarity = 4;

type Humidity = number;
type Temperature = number;

const biomeProps: [Biome.Type, Humidity, Temperature, number][] = [
  [Biome.Type.Barren, 0, 0, 1],
  [Biome.Type.Desert, 0, 1, 1],
  [Biome.Type.FrozenLake, 1, 0, 1],
  [Biome.Type.Lake, 1, 1, 1],

  [Biome.Type.Swamp, 0.8, 1, 0.7],
  [Biome.Type.Plain, 0.5, 0.4, 0.8],
  [Biome.Type.Forest, 0.6, 0.8, 0.7],
  [Biome.Type.SnowPlain, 0.2, 0.3, 0.7],
  [Biome.Type.SnowForest, 0.6, 0.25, 0.7]
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

export function generateBiomes(seed: string, width: number, height: number) {
  const rand = createRand(seed);
  const biomeCenters = poissonDisk(width, height, BiomeSize, rand);
  const waterCenters = poissonDisk(width, height, BiomeSize * WaterRarity, rand);
  const diagram = voronoi()(biomeCenters);

  const waterSources = waterCenters
    .map(position => ({ position, level: rand.floatBetween(0.5, 1) }));
  const computeHumidity = (x: number, y: number) => {
    const norm = BiomeSize * WaterRarity;
    let humidity = 0;
    for (const { position, level } of waterSources) {
      const d = vec2.dist(position, [x, y]);
      const h = level * ((d === 0) ? 1 : Math.pow(1 - Math.min(1, d / norm), 0.5));
      if (h > humidity) humidity = h;
    }
    return humidity;
  };
  const temperatureNoise = new Noise(rand);
  const computeTemp = (x: number, y: number) => {
    const temp = temperatureNoise.noise2D(x, y) * 2 - 1;
    const t = Math.sign(temp) * Math.pow(Math.abs(temp), 0.7);
    return (t + 1) / 2;
  };

  return {
    biomes: biomeCenters.map(([x, y]) => {
      const humidity = computeHumidity(x, y);
      const temperature = computeTemp(x, y);
      const biome: Biome = {
        //type: humidity > 0.9 ? Biome.Type.Lake : humidity > 0.65 ? Biome.Type.Forest : humidity > 0.4 ? Biome.Type.Plain : Biome.Type.Barren,
        type: computeType(humidity, temperature),
        //type: computeType(x / width, y / height),
        x, y,
        humidity, temperature
      };
      return biome;
    }),
    diagram
  };
}

export function rasterize(diagram: VoronoiDiagram<[number, number]>, biomes: Biome[], map: TileMap) {
  for (let y = 0; y < map.height; y++)
    for (let x = 0; x < map.width; x++) {
      const site = diagram.find(x, y)!;
      let type = 0;
      switch (biomes[site.index].type) {
        case Biome.Type.Barren: type = 4; break;
        case Biome.Type.Desert: type = 9; break;
        case Biome.Type.Swamp: type = 7; break;
        case Biome.Type.Forest: type = 2; break;
        case Biome.Type.Plain: type = 6; break;
        case Biome.Type.SnowPlain: type = 8; break;
        case Biome.Type.SnowForest: type = 3; break;
        case Biome.Type.Lake: type = 1; break;
        case Biome.Type.FrozenLake: type = 5; break;
      }
      map.setTile(x, y, type, 0);
    }
}