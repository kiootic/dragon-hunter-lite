import { MapProps } from 'common/map/MapProps';
export interface SerializedMap {
  width: number;
  height: number;
  props: MapProps;
  terrains: Uint16Array;
  objects: Uint16Array;
}