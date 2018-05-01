import { Trait } from 'app/game/traits';
import { defaults } from 'lodash';

export interface StatList {
  hp: number;
  str: number;
  def: number;
  spd: number;
  vit: number;
}

export interface Stats extends Trait {
  readonly type: typeof Stats.Type;
  readonly base: StatList;
  readonly bonus: StatList;
}

export namespace Stats {
  export declare const _mark: Stats;
  export const Type = 'stats';

  export function make(): Stats {
    return {
      type: Stats.Type,
      base: { hp: 100, str: 10, def: 0, spd: 10, vit: 10 },
      bonus: { hp: 0, str: 0, def: 0, spd: 0, vit: 0 }
    };
  }

  export function serialize(trait: Stats) {
    return {
      base: trait.base,
      bonus: trait.bonus
    };
  }

  export function deserialize(data: any): Stats {
    return defaults(data, make());
  }

  export function compute(stats: Stats): StatList {
    return {
      get hp() { return stats.base.hp + stats.bonus.hp; },
      get str() { return stats.base.str + stats.bonus.str; },
      get def() { return stats.base.def + stats.bonus.def; },
      get spd() { return stats.base.spd + stats.bonus.spd; },
      get vit() { return stats.base.vit + stats.bonus.vit; },
    };
  }
}
Trait.types.set(Stats.Type, Stats);