export interface TextureSingle {
  type: 'single';
  tex: string;
  tint?: string;
}

export interface TextureRandom {
  type: 'random';
  texs: string[];
  tint?: string;
}

export type TextureDef = string | TextureSingle | TextureRandom;