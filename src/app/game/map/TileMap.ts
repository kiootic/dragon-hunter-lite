export class TileMap {
  private readonly data: Uint16Array;
  private _dirty = false;
  public get dirty() { return this._dirty; }

  constructor(public readonly width: number, public readonly height: number) {
    this.data = new Uint16Array(width * height * 2);
  }

  private toIndex(x: number, y: number): number {
    return x >= 0 && x < this.width && y >= 0 && y < this.height ?
      (x + this.width * y) * 2 : -1;
  }

  public getTerrain(x: number, y: number) {
    const index = this.toIndex(x, y);
    if (index < 0)
      return 0;
    else
      return this.data[index];
  }

  public getObject(x: number, y: number) {
    const index = this.toIndex(x, y);
    if (index < 0)
      return 0;
    else
      return this.data[index + 1];
  }

  public setTile(x: number, y: number, terrain: number, object: number) {
    const index = this.toIndex(x, y);
    if (index < 0)
      return;

    this.data[index] = terrain;
    this.data[index + 1] = object;
    this._dirty = true;
  }
}