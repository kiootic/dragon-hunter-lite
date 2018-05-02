import { Item, Recipe, TextureDef } from 'common/data';
import { ElementTypes } from 'data/elements';

function recipe(input: { id: string, texture: TextureDef }[], output: Item): Recipe {
  return { input, output };
}

export const makeRecipes = (): Recipe[] => [
  recipe([
    { id: 'bone', texture: 'sprites/items/bone' },
    { id: 'leaf', texture: 'sprites/items/leaf' },
  ], {
      id: 'gel-bone',
      name: 'Bone Gel',
      type: Item.Type.Consumable,
      texture: 'sprites/items/gel',
      aspects: [{
        element: ElementTypes.Chaos,
        amount: 3
      }]
    }),
  recipe([
    { id: 'stone', texture: 'sprites/items/stone' },
    { id: 'leaf', texture: 'sprites/items/leaf' },
  ], {
      id: 'gel-stone',
      name: 'Stone Gel',
      type: Item.Type.Consumable,
      texture: {
        type: 'single',
        tex: 'sprites/items/gel',
        tint: '808080'
      },
      aspects: [{
        element: ElementTypes.Order,
        amount: 3
      }]
    }),
];