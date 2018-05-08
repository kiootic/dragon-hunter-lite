import { Item, Recipe, TextureDef } from 'common/data';

function recipe(input: { accepts: string, texture: TextureDef }[], output: Item): Recipe {
  return { input, output };
}

export const makeRecipes = (): Recipe[] => [
  recipe([
    { accepts: '^bone$', texture: { type: 'single', tex: 'sprites/items/bone', tint: 'ccb396' } },
    { accepts: '^leaf$', texture: 'sprites/items/leaf' },
  ], {
      id: 'gel-bone',
      name: 'Bone Gel',
      description: 'alchemical reagent: boost elemental fusion',
      type: Item.Type.Consumable,
      texture: { type: 'single', tex: 'sprites/items/gel', tint: 'ccb396' }
    }),
  recipe([
    { accepts: '^stone$', texture: 'sprites/items/stone' },
    { accepts: '^leaf$', texture: 'sprites/items/leaf' },
  ], {
      id: 'gel-stone',
      name: 'Stone Gel',
      description: 'alchemical reagent: boost elemental fission',
      type: Item.Type.Consumable,
      texture: { type: 'single', tex: 'sprites/items/gel', tint: '808080' }
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
      texture: { type: 'single', tex: 'sprites/items/gel', tint: 'e06060' }
    }),
  recipe([
    { accepts: '^stone$', texture: 'sprites/items/stone' },
  ], {
      id: 'scale',
      name: 'Stone Shard',
      type: Item.Type.Material,
      texture: { type: 'single', tex: 'sprites/items/scale', tint: '808080' },
      material: {
        name: 'Stone',
        color: '808080',
        weight: 0.1,
        toughness: 0.1,
        sharpness: 0.15,
        affinity: 0.1,
      },
    }),
  recipe([
    { accepts: '^bone$', texture: { type: 'single', tex: 'sprites/items/bone', tint: 'ccb396' } },
  ], {
      id: 'scale',
      name: 'Bone Shard',
      type: Item.Type.Material,
      texture: { type: 'single', tex: 'sprites/items/scale', tint: 'ccb396' },
      material: {
        name: 'Bone',
        color: 'ccb396',
        weight: 0.05,
        toughness: 0.05,
        sharpness: 0.2,
        affinity: 0.15,
      },
    }),
  recipe([
    { accepts: '^wood-', texture: 'sprites/items/wood' },
    { accepts: '^wood-', texture: 'sprites/items/wood' },
  ], {
      id: 'rod',
      name: 'Wooden Rod',
      type: Item.Type.Material,
      texture: { type: 'single', tex: 'sprites/items/rod', tint: 'b3927b' },
      material: {
        name: 'Wood',
        color: 'b3927b',
        weight: 0.15,
        toughness: 0.15,
        sharpness: 0.05,
        affinity: 0.25,
      },
    }),
  recipe([
    { accepts: '^stone$', texture: 'sprites/items/stone' },
    { accepts: '^stone$', texture: 'sprites/items/stone' },
  ], {
      id: 'rod',
      name: 'Stone Rod',
      type: Item.Type.Material,
      texture: { type: 'single', tex: 'sprites/items/rod', tint: '808080' },
      material: {
        name: 'Stone',
        color: '808080',
        weight: 0.25,
        toughness: 0.2,
        sharpness: 0.1,
        affinity: 0.1,
      },
    }),
  recipe([
    { accepts: '^wood-', texture: 'sprites/items/wood' },
    { accepts: '^wood-', texture: 'sprites/items/wood' },
  ], {
      id: 'skin',
      name: 'Wood Plate',
      type: Item.Type.Material,
      texture: { type: 'single', tex: 'sprites/items/skin', tint: 'b3927b' },
      material: {
        name: 'Wood',
        color: 'b3927b',
        weight: 0.2,
        toughness: 0.2,
        sharpness: 0.05,
        affinity: 0.25,
      },
    }),
  recipe([
    { accepts: '^leaf$', texture: 'sprites/items/leaf' },
    { accepts: '^leaf$', texture: 'sprites/items/leaf' },
  ], {
      id: 'skin',
      name: 'Leaf Pelt',
      type: Item.Type.Material,
      texture: { type: 'single', tex: 'sprites/items/skin', tint: '00d000' },
      material: {
        name: 'Leaf',
        color: '00d000',
        weight: 0.1,
        toughness: 0.15,
        sharpness: 0.05,
        affinity: 0.15,
      },
    }),
];