export interface MaterialStats {
  weight: number;
  toughness: number;
  sharpness: number;
  affinity: number;
}

export interface Material extends MaterialStats {
  name: string;
  color: string;
}