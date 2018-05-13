import { DropTable, StatList, TextureDef } from 'common/data';

export interface EnemyDef {
  name: string;
  texture: TextureDef;
  behaviors: any;
  drops: DropTable;
  stats: StatList;
}