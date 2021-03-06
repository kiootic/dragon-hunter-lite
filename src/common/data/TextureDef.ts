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

export interface AnimationDef {
  frameId: string;
  numFrames: number;
  fps: number;
}

export interface TextureAnimation {
  type: 'animation';
  anims: Record<string, AnimationDef>;
  tint?: string;
}

export interface TextureTiled {
  type: 'liquid';
  tex: string;
  offset: number;
  time: number;
  tint?: string;
}

export type TextureDef = string |
  TextureSingle | TextureRandom | TextureComposite | TextureAnimation | TextureTiled;