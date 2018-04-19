export class TileMap {
  private readonly data: Uint16Array;
  private readonly version: Uint8Array;

  constructor(public readonly width: number, public readonly height: number) {
    this.data = new Uint16Array(width * height * 2);
    this.version = new Uint8Array(width * height);
  }

  public serialize() {
    return {
      width: this.width,
      height: this.height,
      data: this.data,
      version: this.version
    };
  }

  public static deserialize(data: ReturnType<TileMap['serialize']>) {
    const map = new TileMap(data.width, data.height);
    map.data.set(data.data);
    map.version.set(data.version);
    return map;
  }

  private toIndex(x: number, y: number): number {
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

  public getVersion(x: number, y: number) {
    const index = this.toIndex(x, y);
    if (index < 0)
      return 0;
    else
      return this.version[index];
  }

  public setTile(x: number, y: number, terrain: number, object: number) {
    const index = this.toIndex(x, y);
    if (index < 0)
      return;

    this.data[index * 2] = terrain;
    this.data[index * 2 + 1] = object;
    this.version[index]++;
  }
}