import { DataLibrary } from 'common/data';
import { GameProps, PlayerProps } from 'common/data/props';
import { SerializedMap } from 'common/map/SerializedMap';

export class GameSave {
  constructor(
    public readonly library: DataLibrary,
    public readonly map: SerializedMap,
    public readonly player: PlayerProps,
    public readonly props: GameProps
  ) {
  }

  public static load(data: any) {
    const { library, map, player, props } = data;
    return new GameSave(library, map, player, props);
  }

  public save(): any {
    return { library: this.library, map: this.map, player: this.player, props: this.props };
  }
}