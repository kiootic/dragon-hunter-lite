import { gaussianRandom } from 'common/random';

export function tilePerSecond(spd: number) {
  return 1 + Math.max(0, spd * 4 / 10);
}

export function healPerTick(vit: number) {
  return Math.max(0, vit / 500);
}

export function computeDamage(power: number, str: number) {
  const strMul = (1 + (str - 10) / 50) * gaussianRandom(1, 0.25, 0.5, 1.5);
  return power * strMul;
}

export function knockbackSpeed(knockback: number) {
  return 5 + knockback * 1.5;
}