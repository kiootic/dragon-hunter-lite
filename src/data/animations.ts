import { TextureDef } from 'common/data';

export const Animations: Record<string, TextureDef> = {
  Player: {
    type: 'animation',
    anims: {
      'left': { frameId: 'sprites/player/left', numFrames: 8, fps: 15 },
      'right': { frameId: 'sprites/player/right', numFrames: 8, fps: 15 },
      'up': { frameId: 'sprites/player/up', numFrames: 8, fps: 15 },
      'down': { frameId: 'sprites/player/down', numFrames: 8, fps: 15 },

      'fist-left': { frameId: 'sprites/player/fist-left', numFrames: 5, fps: 15 },
      'fist-right': { frameId: 'sprites/player/fist-right', numFrames: 5, fps: 15 },
      'fist-up': { frameId: 'sprites/player/fist-up', numFrames: 5, fps: 15 },
      'fist-down': { frameId: 'sprites/player/fist-down', numFrames: 5, fps: 15 },

      'sword-left': { frameId: 'sprites/player/sword-left', numFrames: 5, fps: 15 },
      'sword-right': { frameId: 'sprites/player/sword-right', numFrames: 5, fps: 15 },
      'sword-up': { frameId: 'sprites/player/sword-up', numFrames: 5, fps: 15 },
      'sword-down': { frameId: 'sprites/player/sword-down', numFrames: 5, fps: 15 },

      'spear-left': { frameId: 'sprites/player/spear-left', numFrames: 7, fps: 10 },
      'spear-right': { frameId: 'sprites/player/spear-right', numFrames: 7, fps: 10 },
      'spear-up': { frameId: 'sprites/player/spear-up', numFrames: 7, fps: 10 },
      'spear-down': { frameId: 'sprites/player/spear-down', numFrames: 7, fps: 10 },

      'arrow-left': { frameId: 'sprites/player/arrow-left', numFrames: 11, fps: 48 },
      'arrow-right': { frameId: 'sprites/player/arrow-right', numFrames: 11, fps: 48 },
      'arrow-up': { frameId: 'sprites/player/arrow-up', numFrames: 11, fps: 48 },
      'arrow-down': { frameId: 'sprites/player/arrow-down', numFrames: 11, fps: 48 },
    }
  }
};