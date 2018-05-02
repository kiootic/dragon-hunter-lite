import { Item, Recipe, TextureDef } from 'common/data';

function recipe(input: { id: string, texture: TextureDef }[], output: Item): Recipe {
  return { input, output };
}

export const makeRecipes = (): Recipe[] => [
  recipe([{
    id: 'flint',
    texture: 'sprites/items/flint'
  }, {
    id: 'stone',
    texture: 'sprites/items/stone'
  }], {
      id: 'flint-stone',
      name: 'Flint and Stone',
      type: Item.Type.Material,
      texture: 'sprites/items/flint-stone'
    }),
  recipe([{
    id: 'bone',
    texture: 'sprites/items/bone'
  }], {
      id: 'dust-bone',
      name: 'Bone Dust',
      type: Item.Type.Material,
      texture: 'sprites/items/dust'
    }),
  recipe([{
    id: 'stone',
    texture: 'sprites/items/stone'
  }], {
      id: 'dust-stone',
      name: 'Stone Dust',
      type: Item.Type.Material,
      texture: {
        type: 'single',
        tex: 'sprites/items/dust',
        tint: '808080'
      }
    }),
];