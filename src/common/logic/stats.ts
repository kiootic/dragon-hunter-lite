export function tilePerSecond(spd: number) {
  return 1 + Math.max(0, spd * 4 / 10);
}

export function healPerTick(vit: number) {
  return Math.max(0, vit / 500);
}