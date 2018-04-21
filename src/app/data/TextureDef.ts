export interface TextureRandom {
  type: 'random';
  texs: string[];
  tint?: string;
}

export type TextureDef = string | TextureRandom;