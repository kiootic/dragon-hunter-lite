import { EntityProps } from 'common/data/props';

export const InitialPlayer = (): EntityProps => ({
  id: 1,
  type: 'player',
  traits: {
    'spatial': {
      pos: [0, 0]
    }
  }
});