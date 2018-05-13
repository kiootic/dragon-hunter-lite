import { DropTable, StatList, TextureDef } from 'common/data';

export interface EnemyDef {
  name: string;
  texture: TextureDef;
  horizontalAnim: boolean;
  scale: number;
  offset: [number, number];
  behaviors: any;
  drops: DropTable;
  stats: StatList;
}