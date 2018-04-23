import { DataLibrary } from 'common/data';
import { SerializedMap } from 'common/map/SerializedMap';

export class GameSave {
  constructor(
    public readonly library: DataLibrary,
    public readonly map: SerializedMap,
  ) {
  }

  public static load(data: any) {
    const { library, map } = data;
    return new GameSave(library, map);
  }

  public save(): any {
    return { library: this.library, map: this.map };
  }
}