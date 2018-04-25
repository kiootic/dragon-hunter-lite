import { MapProps, SerializedMap } from 'common/map';
import { Subject } from 'rxjs/Subject';

export interface MapChange {
  x: number;
  y: number
}

export class TileMap {
  private readonly data: Uint16Array;
  public readonly changes$ = new Subject<MapChange>();

  constructor(
    public readonly width: number, public readonly height: number,
    public readonly props: MapProps
  ) {
    this.data = new Uint16Array(width * height * 2);
  }

  public serialize(): SerializedMap {
    const terrains = new Uint16Array(this.width * this.height);
    const objects = new Uint16Array(this.width * this.height);
    for (let i = 0; i < terrains.length; i++) {
      terrains[i] = this.data[i * 2];
      objects[i] = this.data[i * 2 + 1];
    }
    return {
      width: this.width,
      height: this.height,
      props: this.props,
      terrains, objects
    };
  }

  public static deserialize(data: SerializedMap) {
    const map = new TileMap(data.width, data.height, data.props);
    const len = data.width * data.height;
    for (let i = 0; i < len; i++) {
      map.data[i * 2] = data.terrains[i];
      map.data[i * 2 + 1] = data.objects[i];
    }
    return map;
  }

  private toIndex(x: number, y: number): number {
    x = Math.floor(x);
    y = Math.floor(y);
    return x >= 0 && x < this.width && y >= 0 && y < this.height ?
      (x + this.width * y) : -1;
  }

  public getTerrain(x: number, y: number) {
    const index = this.toIndex(x, y);
    if (index < 0)
      return 0;
    else
      return this.data[index * 2];
  }

  public getObject(x: number, y: number) {
    const index = this.toIndex(x, y);
    if (index < 0)
      return 0;
    else
      return this.data[index * 2 + 1];
  }

  public setTile(x: number, y: number, terrain: number, object: number) {
    const index = this.toIndex(x, y);
    if (index < 0)
      return;

    this.data[index * 2] = terrain;
    this.data[index * 2 + 1] = object;
    this.changes$.next({ x, y });
  }
}