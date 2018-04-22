export interface SerializedMap {
  seed: string;
  width: number;
  height: number;
  terrains: Uint16Array;
  objects: Uint16Array;
}