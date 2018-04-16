import { TileMap } from "app/game/map/TileMap";
import { poissonDisk, Noise } from "app/game/map/utils";
import { generateBiomes, rasterize } from "app/game/map/generation/biome";
import { App } from "app";
import OpenSimplexNoise from 'open-simplex-noise';
import { create as createRand } from "random-seed";

export class Generator {
  public readonly map: TileMap;

  constructor(width: number, height: number, public readonly seed = '') {
    this.map = new TileMap(width, height);
  }

  public generate() {
    const rand = createRand(this.seed);
    const biomes = generateBiomes(rand, this.map.width, this.map.height);
    rasterize(biomes, this.map, rand);

    this.visualize();
    return this.map;
  }

  private visualize() {
    const canvas = document.createElement('canvas');
    canvas.width = this.map.width;
    canvas.height = this.map.height;
    const ctx = canvas.getContext('2d')!;
    const data = ctx.getImageData(0, 0, this.map.width, this.map.height);

    const noise = new Noise(createRand(''));
    for (let y = 0; y < this.map.height; y++)
      for (let x = 0; x < this.map.width; x++) {
        let color: [number, number, number] = [0, 0, 0];

        switch (App.instance.library.terrains[this.map.getTerrain(x, y)].name) {
          case "water": color = [0, 0, 255]; break;
          case "deepgrass": color = [0, 127, 0]; break;
          case "lava": color = [255, 0, 0]; break;
          case "stone": color = [127, 127, 127]; break;
          case "ice": color = [200, 200, 255]; break;
          case "grass": color = [0, 255, 0]; break;
          case "lightgrass": color = [100, 200, 110]; break;
          case "mud": color = [110, 40, 0]; break;
          case "snow": color = [220, 220, 220]; break;
          case "sand": color = [200, 180, 100]; break;
        }

        //const v = noise.noise2D(x, y) * 255; color = [v, v, v];

        data.data[(x + y * this.map.width) * 4] = color[0];
        data.data[(x + y * this.map.width) * 4 + 1] = color[1];
        data.data[(x + y * this.map.width) * 4 + 2] = color[2];
        data.data[(x + y * this.map.width) * 4 + 3] = 255;
      }
    ctx.putImageData(data, 0, 0);
    const url = canvas.toDataURL('image/png');
    canvas.style.position = 'absolute';
    canvas.style.left = '0';
    canvas.style.top = '0';
    document.body.appendChild(canvas);
  }
}