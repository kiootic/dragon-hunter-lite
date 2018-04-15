import { TileMap } from "app/game/map/TileMap";
import { poissonDisk } from "app/game/map/utils";
import { generateBiomes, rasterize } from "app/game/map/generation/biome";
import { App } from "app";

export class Generator {
  public readonly map: TileMap;

  constructor(width: number, height: number, public readonly seed = '') {
    this.map = new TileMap(width, height);
  }

  public generate() {
    const { diagram, biomes } = generateBiomes(this.seed, this.map.width, this.map.height);
    rasterize(diagram, biomes, this.map);

    this.visualize();
  }

  private visualize() {
    const canvas = document.createElement('canvas');
    canvas.width = this.map.width;
    canvas.height = this.map.height;
    const ctx = canvas.getContext('2d')!;
    const data = ctx.getImageData(0, 0, this.map.width, this.map.height);
    for (let y = 0; y < this.map.height; y++)
      for (let x = 0; x < this.map.width; x++) {
        let color: [number, number, number] = [0, 0, 0];
        switch (App.instance.library.terrains[this.map.getTerrain(x, y)].name) {
          case "water": color = [0, 0, 255]; break;
          case "grass": color = [0, 127, 0]; break;
          case "lava": color = [255, 0, 0]; break;
          case "stone": color = [127, 127, 127]; break;
          case "ice": color = [200, 200, 255]; break;
          case "lightgrass": color = [0, 255, 0]; break;
          case "mud": color = [127, 127, 0]; break;
          case "snow": color = [200, 200, 200]; break;
          case "sand": color = [200, 200, 0]; break;
        }
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