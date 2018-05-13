import { Entity } from 'app/game/entities';
import { Stats } from 'app/game/traits';
import { tilePerSecond } from 'common/logic/stats';
import { vec2 } from 'gl-matrix';

export function computeVelocity(velocity: vec2, direction: vec2 | [number, number], entity: Entity) {
  const { spd } = Stats.compute(entity.traits.get(Stats));
  const speed = tilePerSecond(spd);
  vec2.scale(velocity, direction, speed);
}