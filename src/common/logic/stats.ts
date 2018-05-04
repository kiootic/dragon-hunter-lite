export function tilePerSecond(spd: number) {
  return 1 + Math.max(0, spd * 4 / 10);
}