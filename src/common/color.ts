export function blend(colors: { color: number, weight?: number }[]) {
  const rgb = [0, 0, 0];
  let total = 0;
  for (const { color, weight } of colors) {
    const elemColor = color;
    const w = weight || 1;
    rgb[0] += ((elemColor >> 16) & 0xff) * w;
    rgb[1] += ((elemColor >> 8) & 0xff) * w;
    rgb[2] += ((elemColor >> 0) & 0xff) * w;
    total += w;
  }
  return (
    (Math.floor(rgb[0] / total) << 16) +
    (Math.floor(rgb[1] / total) << 8) +
    (Math.floor(rgb[2] / total) << 0)
  );
}