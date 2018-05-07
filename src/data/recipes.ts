import { Item, Recipe, TextureDef } from 'common/data';

function recipe(input: { accepts: string, texture: TextureDef }[], output: Item): Recipe {
  return { input, output };
}

export const makeRecipes = (): Recipe[] => [
  recipe([
    { accepts: '^bone$', texture: 'sprites/items/bone' },
    { accepts: '^leaf$', texture: 'sprites/items/leaf' },
  ], {
      id: 'gel-bone',
      name: 'Bone Gel',
      description: 'alchemical reagent: boost elemental fusion',
      type: Item.Type.Consumable,
      texture: 'sprites/items/gel'
    }),
  recipe([
    { accepts: '^stone$', texture: 'sprites/items/stone' },
    { accepts: '^leaf$', texture: 'sprites/items/leaf' },
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
    { accepts: '^solution$', texture: 'sprites/items/solution' },
    { accepts: '^leaf$', texture: 'sprites/items/leaf' },
    { accepts: '^stone$', texture: 'sprites/items/stone' },
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
  recipe([
    { accepts: '^stone$', texture: 'sprites/items/stone' },
  ], {
      id: 'scale',
      name: 'Stone Shard',
      type: Item.Type.Material,
      texture: {
        type: 'single',
        tex: 'sprites/items/scale',
        tint: '808080'
      }
    }),
  recipe([
    { accepts: '^bone$', texture: 'sprites/items/bone' },
  ], {
      id: 'scale',
      name: 'Bone Shard',
      type: Item.Type.Material,
      texture: 'sprites/items/scale',
    }),
  recipe([
    { accepts: '^wood-', texture: 'sprites/items/wood' },
    { accepts: '^wood-', texture: 'sprites/items/wood' },
  ], {
      id: 'rod',
      name: 'Wooden Rod',
      type: Item.Type.Material,
      texture: {
        type: 'single',
        tex: 'sprites/items/rod',
        tint: '7a6454'
      }
    }),
  recipe([
    { accepts: '^stone$', texture: 'sprites/items/stone' },
    { accepts: '^stone$', texture: 'sprites/items/stone' },
  ], {
      id: 'rod',
      name: 'Stone Rod',
      type: Item.Type.Material,
      texture: {
        type: 'single',
        tex: 'sprites/items/rod',
        tint: '808080'
      }
    }),
];