import { Trait } from 'app/game/traits';
import { Effect, TextureDef, Weapon } from 'common/data';
import { vec2 } from 'gl-matrix';
import { defaults } from 'lodash';

export interface ProjectileData extends Trait {
  readonly type: typeof ProjectileData.Type;

  readonly sourceEntityId: number;
  readonly damage: number;
  readonly weapon: Weapon;
  readonly effects: Effect[];

  readonly start: vec2;
  readonly end: vec2;
  readonly lifetime: number;
  readonly texture: TextureDef;

  readonly hit: Set<string>;
}

export namespace ProjectileData {
  export declare const _mark: ProjectileData;
  export const Type = 'projectile-data';

  export function make(args?: Pick<ProjectileData, Exclude<keyof ProjectileData, 'type' | 'hit'>>): ProjectileData {
    return {
      type: ProjectileData.Type,
      sourceEntityId: args ? args.sourceEntityId : 0,
      weapon: args ? args.weapon : undefined as any,
      damage: args ? args.damage : 0,
      effects: args ? args.effects : [],
      start: args ? vec2.clone(args.start) : vec2.fromValues(0, 0),
      end: args ? vec2.clone(args.end) : vec2.fromValues(0, 0),
      lifetime: args ? args.lifetime : 0,
      texture: args ? args.texture : '',
      hit: new Set<string>()
    };
  }

  export function serialize(trait: ProjectileData) {
    return {
      sourceEntityId: trait.sourceEntityId,
      weapon: trait.weapon,
      damage: trait.damage,
      effects: trait.effects,
      lifetime: trait.lifetime,
      start: [trait.start[0], trait.start[1]],
      end: [trait.end[0], trait.end[1]],
      texture: trait.texture,
      hit: Array.from(trait.hit)
    };
  }

  export function deserialize(data: any, trait: ProjectileData): ProjectileData {
    return defaults({
      sourceEntityId: data.sourceEntityId,
      weapon: data.weapon,
      damage: data.damage,
      effects: data.effects,
      lifetime: data.lifetime,
      start: data.start && vec2.fromValues(data.start[0], data.start[1]),
      end: data.end && vec2.fromValues(data.end[0], data.end[1]),
      texture: data.texture,
      hit: data.hit && new Set(data.hit)
    }, trait);
  }
}
Trait.types.set(ProjectileData.Type, ProjectileData);