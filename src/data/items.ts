import { Item } from 'common/data';

export const Wood = (): Item => ({
  name: 'Wood',
  type: Item.Type.Material,
  texture: 'sprites/items/wood'
});

export const Bone = (): Item => ({
  name: 'Bone',
  type: Item.Type.Material,
  texture: 'sprites/items/bone'
});