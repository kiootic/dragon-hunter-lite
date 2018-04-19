import { VoronoiDiagram } from 'd3-voronoi';
import { Biome } from 'worker/mapgen/data/Biome';
import { RandomSeed, create as createRand } from 'random-seed';
import { DataLibrary } from 'worker/data';
import { SerializedMap } from 'worker/mapgen/data/SerializedMap';

export interface RiverSegment {
  from: [number, number];
  to: [number, number];
  level: number;
}

export class MapData {
  public readonly random: RandomSeed;
  private readonly terrains: Uint16Array;
  private readonly objects: Uint16Array;
  private readonly tileBiomes: Uint16Array;
  public voronoi!: VoronoiDiagram<[number, number]>;
  public biomes: Biome[] = [];
  public rivers: RiverSegment[] = [];

  private readonly terrainLookup: Record<string, number>;
  private readonly objectLookup: Record<string, number>;

  constructor(
    public readonly width: number, public readonly height: number,
    public readonly seed: string, public readonly library: DataLibrary
  ) {
    this.terrains = new Uint16Array(width * height);
    this.objects = new Uint16Array(width * height);
    this.tileBiomes = new Uint16Array(width * height);
    this.random = createRand(seed);

    function makeLookup(items: ({ name: string, id: number } | null)[]): Record<string, number> {
      return Object.assign({}, ...items
        .filter(item => item)
        .map(item => ({ [item!.name]: item!.id }))
      );
    }

    this.terrainLookup = makeLookup(library.terrains);
    this.objectLookup = makeLookup(library.objects);
  }

  public finalize(): SerializedMap {
    return {
      width: this.width, height: this.height,
      terrains: this.terrains,
      objects: this.objects
    }
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
      return this.terrains[index];
  }

  public getObject(x: number, y: number) {
    const index = this.toIndex(x, y);
    if (index < 0)
      return 0;
    else
      return this.objects[index];
  }

  public getBiomeIndex(x: number, y: number) {
    const index = this.toIndex(x, y);
    if (index < 0)
      return 0;
    else
      return this.tileBiomes[index];
  }

  public setTerrain(x: number, y: number, terrainName: string | null) {
    const index = this.toIndex(x, y);
    if (index < 0)
      return;

    this.terrains[index] = terrainName ? this.terrainLookup[terrainName] : 0;
  }

  public setObject(x: number, y: number, objectName: string | null) {
    const index = this.toIndex(x, y);
    if (index < 0)
      return;

    this.terrains[index] = objectName ? this.objectLookup[objectName] : 0;
  }

  public setBiomeIndex(x: number, y: number, biomeIndex: number) {
    const index = this.toIndex(x, y);
    if (index < 0)
      return;

    this.tileBiomes[index] = biomeIndex;
  }
}