import { TextureDef } from 'common/data';

export const Animations: Record<string, TextureDef> = {
  Player: {
    type: 'animation',
    anims: {
      'left': { frameId: 'sprites/player/left', numFrames: 8, fps: 15 },
      'right': { frameId: 'sprites/player/right', numFrames: 8, fps: 15 },
      'up': { frameId: 'sprites/player/up', numFrames: 8, fps: 15 },
      'down': { frameId: 'sprites/player/down', numFrames: 8, fps: 15 },

      'attack-left': { frameId: 'sprites/player/attack-left', numFrames: 5, fps: 15 },
      'attack-right': { frameId: 'sprites/player/attack-right', numFrames: 5, fps: 15 },
      'attack-up': { frameId: 'sprites/player/attack-up', numFrames: 5, fps: 15 },
      'attack-down': { frameId: 'sprites/player/attack-down', numFrames: 5, fps: 15 },
    }
  }
};