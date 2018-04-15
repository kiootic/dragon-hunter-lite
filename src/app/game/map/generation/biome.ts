import { poissonDisk } from "app/game/map/utils";
import { RandomSeed, create as createRand } from "random-seed";
import { voronoi, VoronoiDiagram } from 'd3-voronoi';
import { Biome } from "app/game/map/Biome";
import { TileMap } from "app/game/map/TileMap";

const BiomeSize = 64;

export function generateBiomes(seed: string, width: number, height: number) {
  const biomePoints = poissonDisk(width, height, BiomeSize, createRand(seed));
  const diagram = voronoi()(biomePoints);

  return {
    biomes: biomePoints.map(([x, y]) => ({
      type: Biome.Type.None,
      x, y,
      humidity: 0,
      temperature: 0
    } as Biome)),
    diagram
  };
}

export function rasterize(diagram: VoronoiDiagram<[number, number]>, biomes: Biome[], map: TileMap) {
  for (let y = 0; y < map.height; y++)
    for (let x = 0; x < map.width; x++) {
      const site = diagram.find(x,y);
      const type = ((site && site.index || 0) % 9) + 1;
      map.setTile(x, y, type, 0);
    }
}