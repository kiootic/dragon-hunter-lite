import { DataLibrary } from 'common/data';
import { PlayerProps } from 'common/data/props/PlayerProps';
import { SerializedMap } from 'common/map/SerializedMap';

export class GameSave {
  constructor(
    public readonly library: DataLibrary,
    public readonly map: SerializedMap,
    public readonly player: PlayerProps
  ) {
  }

  public static load(data: any) {
    const { library, map, player } = data;
    return new GameSave(library, map, player);
  }

  public save(): any {
    return { library: this.library, map: this.map, player: this.player };
  }
}