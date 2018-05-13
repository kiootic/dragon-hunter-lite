import { ActionState, ConditionState } from 'app/game/behavior';
import { Charge, Chase, Escape, Shoot } from 'app/game/behavior/actions';
import { AtSpawn, Distance, HP } from 'app/game/behavior/conditions';
import { Weapon } from 'common/data';

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export const Attacks: ((color: string) => ActionState)[] = [
  // targeted
  (color: string) => Shoot.make({
    type: Math.random() < 0.5 ? Weapon.Type.Bolt : Weapon.Type.Orb,
    pierce: true,
    strength: 5 + random(-3, 5),
    cooldown: 5000 + random(-2000, 2000),
    knockback: 10,
    range: 5 + random(-2, 2),
    color
  }, [], 1000 + random(-500, 1000), Math.floor(random(1, 3)), random(5, 20), Math.random() * 2000),

  // ring
  (color: string) => {
    let numShoots = Math.floor(random(3, 6));
    return Shoot.make({
      type: Math.random() < 0.5 ? Weapon.Type.Bolt : Weapon.Type.Orb,
      pierce: true,
      strength: 5 + random(-3, 5),
      cooldown: 5000 + random(-2000, 2000),
      knockback: 10,
      range: 5 + random(-2, 2),
      color
    }, [], 1000 + random(-500, 1000), numShoots, 360 / numShoots, Math.random() * 2000);
  },
];

export const Movements: (() => ActionState)[] = [
  () => Chase.make(),
  () => Charge.make(),
  () => Escape.make()
];

export const Conditions: (() => ConditionState)[] = [
  () => HP.greaterThan(random(0.7, 0.9)),
  () => HP.lessThan(random(0.3, 0.4)),
  () => AtSpawn.make(),
  () => Distance.greaterThan(random(6, 10)),
  () => Distance.lessThan(random(5, 8)),
];