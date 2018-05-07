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

      'sword-left': { frameId: 'sprites/player/sword-left', numFrames: 5, fps: 15 },
      'sword-right': { frameId: 'sprites/player/sword-right', numFrames: 5, fps: 15 },
      'sword-up': { frameId: 'sprites/player/sword-up', numFrames: 5, fps: 15 },
      'sword-down': { frameId: 'sprites/player/sword-down', numFrames: 5, fps: 15 },

      'spear-left': { frameId: 'sprites/player/spear-left', numFrames: 7, fps: 10 },
      'spear-right': { frameId: 'sprites/player/spear-right', numFrames: 7, fps: 10 },
      'spear-up': { frameId: 'sprites/player/spear-up', numFrames: 7, fps: 10 },
      'spear-down': { frameId: 'sprites/player/spear-down', numFrames: 7, fps: 10 },

      'bow-left': { frameId: 'sprites/player/bow-left', numFrames: 12, fps: 48 },
      'bow-right': { frameId: 'sprites/player/bow-right', numFrames: 12, fps: 48 },
      'bow-up': { frameId: 'sprites/player/bow-up', numFrames: 12, fps: 48 },
      'bow-down': { frameId: 'sprites/player/bow-down', numFrames: 12, fps: 48 },
    }
  }
};