import { Item, Recipe, TextureDef } from 'common/data';

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
      description: 'alchemical reagent: boost elemental fusion',
      type: Item.Type.Consumable,
      texture: 'sprites/items/gel'
    }),
  recipe([
    { id: 'stone', texture: 'sprites/items/stone' },
    { id: 'leaf', texture: 'sprites/items/leaf' },
  ], {
      id: 'gel-stone',
      name: 'Stone Gel',
      description: 'alchemical reagent: boost elemental fission',
      type: Item.Type.Consumable,
      texture: {
        type: 'single',
        tex: 'sprites/items/gel',
        tint: '808080'
      }
    }),
  recipe([
    { id: 'solution', texture: 'sprites/items/solution' },
    { id: 'leaf', texture: 'sprites/items/leaf' },
    { id: 'stone', texture: 'sprites/items/stone' },
  ], {
      id: 'gel-alchemy',
      name: 'Alchemical Gel',
      description: 'alchemical reagent: purify solution',
      type: Item.Type.Consumable,
      texture: {
        type: 'single',
        tex: 'sprites/items/gel',
        tint: 'e06060'
      }
    }),
];