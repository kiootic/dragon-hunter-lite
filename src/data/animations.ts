import { TextureDef } from 'common/data';

export const Animations: Record<string, TextureDef> = {
  Player: {
    type: 'animation',
    anims: {
      'left': { frameId: 'sprites/player/left', numFrames: 8, fps: 15 },
      'right': { frameId: 'sprites/player/right', numFrames: 8, fps: 15 },
      'up': { frameId: 'sprites/player/up', numFrames: 8, fps: 15 },
      'down': { frameId: 'sprites/player/down', numFrames: 8, fps: 15 },

      'interact-left': { frameId: 'sprites/player/interact-left', numFrames: 5, fps: 15 },
      'interact-right': { frameId: 'sprites/player/interact-right', numFrames: 5, fps: 15 },
      'interact-up': { frameId: 'sprites/player/interact-up', numFrames: 5, fps: 15 },
      'interact-down': { frameId: 'sprites/player/interact-down', numFrames: 5, fps: 15 },
    }
  }
};