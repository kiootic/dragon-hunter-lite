import { Trait } from 'app/game/traits';
import { Effect } from 'common/data';
import { defaults } from 'lodash';

export interface StatList {
  hp: number;
  maxHp: number;
  str: number;
  def: number;
  spd: number;
  vit: number;
}

export interface Stats extends Trait {
  readonly type: typeof Stats.Type;
  readonly base: StatList;
  readonly boost: StatList; // effects
  readonly bonus: StatList; // equipments

  readonly effects: Effect[];
}

export namespace Stats {
  export declare const _mark: Stats;
  export const Type = 'stats';

  export function make(): Stats {
    return {
      type: Stats.Type,
      base: { hp: 100, maxHp: 100, str: 10, def: 0, spd: 10, vit: 10 },
      boost: { hp: 0, maxHp: 0, str: 0, def: 0, spd: 0, vit: 0 },
      bonus: { hp: 0, maxHp: 0, str: 0, def: 0, spd: 0, vit: 0 },
      effects: []
    };
  }

  export function serialize(trait: Stats) {
    return {
      base: trait.base,
      effects: trait.effects,
    };
  }

  export function deserialize(data: any, trait: Stats): Stats {
    return defaults({
      base: data.base || { hp: 100, maxHp: 100, str: 10, def: 0, spd: 10, vit: 10 },
      effects: data.effects || [],
    }, trait);
  }

  export function compute(stats: Stats): StatList {
    return {
      get hp() { return stats.base.hp + stats.boost.hp + stats.bonus.hp; },
      get maxHp() { return stats.base.maxHp + stats.boost.maxHp + stats.bonus.maxHp; },
      get str() { return stats.base.str + stats.boost.str + stats.bonus.str; },
      get def() { return stats.base.def + stats.boost.def + stats.bonus.def; },
      get spd() { return stats.base.spd + stats.boost.spd + stats.bonus.spd; },
      get vit() { return stats.base.vit + stats.boost.vit + stats.bonus.vit; },
    };
  }
}
Trait.types.set(Stats.Type, Stats);