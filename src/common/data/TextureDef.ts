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

export interface TextureComposite {
  type: 'composite';
  base: TextureDef;
  overlay: TextureDef;
}

export type TextureDef = string | TextureSingle | TextureRandom | TextureComposite;