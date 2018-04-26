import { fromBase64, toBase64 } from 'common/base64';
import { DataLibrary } from 'common/data';
import { EntityProps, GameProps } from 'common/data/props';
import { SerializedMap } from 'common/map/SerializedMap';
import { compress, decompress } from 'common/zlib';

export class GameSave {
  constructor(
    public id: string,
    public library: DataLibrary,
    public map: SerializedMap,
    public entities: EntityProps[],
    public readonly props: GameProps
  ) {
  }

  public static load(data: any) {
    const { id, library, map, entities, props } = data;
    return new GameSave(id, library, map, entities, props);
  }

  public save(): any {
    return {
      id: this.id,
      library: this.library,
      map: this.map,
      entities: this.entities,
      props: this.props
    };
  }

  public static import(json: string): GameSave {
    const data = JSON.parse(json);
    data.map = {
      ...data.map,
      terrains: new Uint16Array(decompress(fromBase64(data.map.terrains))),
      objects: new Uint16Array(decompress(fromBase64(data.map.objects)))
    };
    return GameSave.load(data);
  }

  public export(): string {
    const data = this.save();
    data.map = {
      ...data.map,
      terrains: toBase64(compress(data.map.terrains.buffer)),
      objects: toBase64(compress(data.map.objects.buffer))
    };
    return JSON.stringify(data);
  }
}