import { blend } from 'common/color';
import { Aspect, Effect, Element, Item, Material, TextureDef, Weapon } from 'common/data';
import { mix } from 'common/logic/alchemy';
import { compute as computeArmors } from 'common/logic/effect/armors';
import { scaleAspects } from 'common/logic/effect/common';
import { compute as computeSolution } from 'common/logic/effect/solution';
import { startCase } from 'lodash';

export enum AssemblyType {
  Chestplate = 'chestplate',
  Leggings = 'leggings',
  Boots = 'boots',
  Sword = 'sword',
  Spear = 'spear',
  Bow = 'bow',
  Arrow = 'arrow',
  Infusion = 'infusion'
}

const Parts: Record<Exclude<AssemblyType, AssemblyType.Infusion>, Material[]> = {
  [AssemblyType.Chestplate]: [
    { weight: 0.2, toughness: 0.4, sharpness: 0.4, affinity: 0.2, },
    { weight: 0.2, toughness: 0.4, sharpness: 0.4, affinity: 0.2, },
    { weight: 0.05, toughness: 0, sharpness: 0.1, affinity: 0.45, },
    { weight: 0.35, toughness: 0.2, sharpness: 0.1, affinity: 0.15, },
  ],
  [AssemblyType.Leggings]: [
    { weight: 0.2, toughness: 0.3, sharpness: 0.3, affinity: 0.5, },
    { weight: 0.4, toughness: 0.35, sharpness: 0.35, affinity: 0.25, },
    { weight: 0.4, toughness: 0.35, sharpness: 0.35, affinity: 0.25, },
  ],
  [AssemblyType.Boots]: [
    { weight: 0.5, toughness: 0.5, sharpness: 0.5, affinity: 0.5, },
    { weight: 0.5, toughness: 0.5, sharpness: 0.5, affinity: 0.5, },
  ],
  [AssemblyType.Sword]: [
    { weight: 0.45, toughness: 0.3, sharpness: 0.5, affinity: 0.25, },
    { weight: 0.35, toughness: 0.3, sharpness: 0.4, affinity: 0.2, },
    { weight: 0.2, toughness: 0.4, sharpness: 0.1, affinity: 0.55, },
  ],
  [AssemblyType.Spear]: [
    { weight: 0.6, toughness: 0.1, sharpness: 0.9, affinity: 0.7, },
    { weight: 0.2, toughness: 0.45, sharpness: 0.05, affinity: 0.15, },
    { weight: 0.2, toughness: 0.45, sharpness: 0.05, affinity: 0.15, },
  ],
  [AssemblyType.Bow]: [
    { weight: 0.35, toughness: 0.1, sharpness: 0.05, affinity: 0.2, },
    { weight: 0.1, toughness: 0.1, sharpness: 0.35, affinity: 0.05, },
    { weight: 0.35, toughness: 0.1, sharpness: 0.05, affinity: 0.2, },
    { weight: 0.05, toughness: 0.3, sharpness: 0.1, affinity: 0.25, },
    { weight: 0.1, toughness: 0.1, sharpness: 0.35, affinity: 0.05, },
    { weight: 0.05, toughness: 0.3, sharpness: 0.1, affinity: 0.25, },
  ],
  [AssemblyType.Arrow]: [
    { weight: 0.6, toughness: 0.5, sharpness: 0.45, affinity: 0.4, },
    { weight: 0.3, toughness: 0.4, sharpness: 0.1, affinity: 0.2, },
    { weight: 0.1, toughness: 0.1, sharpness: 0.45, affinity: 0.4, },
  ]
};

export function assemble(type: AssemblyType, parts: Item[], data: Record<string, Element>): Item | null {
  if (type === AssemblyType.Infusion) {
    const material = parts[1].material;
    if (!material) {
      console.error('unexpected item');
      return null;
    }
    if (parts[1].type === Item.Type.Weapon) {
      const aspects = scaleAspects(mix(parts, data), material.affinity);
      return Object.assign({}, parts[1], { effects: computeSolution(aspects) });
    } else {
      const [effects, aspects] = computeArmors(parts, material, 1, data);
      return Object.assign({}, parts[1], { aspects, effects });
    }
  } else {
    const mat: Material = { weight: 0, toughness: 0, sharpness: 0, affinity: 0 };
    for (let i = 0; i < parts.length; i++) {
      const material = parts[i].material;
      if (!material) {
        console.error('unexpected item');
        return null;
      }
      mat.weight += material.weight * Parts[type][i].weight;
      mat.toughness += material.toughness * Parts[type][i].toughness;
      mat.sharpness += material.sharpness * Parts[type][i].sharpness;
      mat.affinity += material.affinity * Parts[type][i].affinity;
    }
    mat.weight *= parts.length;
    mat.toughness = Math.pow(mat.toughness, 1.5);
    mat.sharpness = Math.pow(mat.sharpness, 1.5);
    console.log(mat);

    let weapon: Weapon | undefined;
    let effects: Effect[];
    let aspects: Aspect[];
    let texture: TextureDef;
    let itemType = Item.Type.Weapon;
    function blendPartColors(parts: Item[]) {
      return blend(parts.map(({ texture }) => ({
        color: parseInt((texture as any).tint || 'ffffff', 16)
      }))).toString(16);
    }

    switch (type) {
      case AssemblyType.Sword:
        weapon = {
          type: Weapon.Type.Sword,
          strength: mat.sharpness * (1 + mat.weight) * (1 + mat.toughness) * 100,
          cooldown: mat.weight * (1 - mat.toughness) * 10000,
          knockback: mat.weight * (1 + mat.sharpness) * 10,
          range: 2
        };
        aspects = mix(parts, data);
        effects = computeSolution(aspects);
        texture = {
          type: 'composite',
          overlay: {
            type: 'single',
            tex: 'sprites/items/sword-blade',
            tint: blendPartColors(parts.slice(0, 2))
          },
          base: {
            type: 'single',
            tex: 'sprites/items/sword',
            tint: (parts[2].texture as any).tint || 'ffffff'
          }
        };
        break;
      case AssemblyType.Spear:
        weapon = {
          type: Weapon.Type.Spear,
          strength: mat.sharpness * (1 + mat.weight) * (1 + mat.toughness) * 250,
          cooldown: mat.weight * (1 - mat.toughness) * 20000,
          knockback: mat.weight * (1 + mat.sharpness) * 15,
          range: 3.5
        };
        aspects = mix(parts, data);
        effects = computeSolution(aspects);
        texture = {
          type: 'composite',
          overlay: {
            type: 'single',
            tex: 'sprites/items/spear-head',
            tint: (parts[0].texture as any).tint || 'ffffff'
          },
          base: {
            type: 'single',
            tex: 'sprites/items/spear',
            tint: blendPartColors(parts.slice(1, 3))
          }
        };
        break;
      case AssemblyType.Bow:
        weapon = {
          type: Weapon.Type.Bow,
          strength: mat.toughness * (1 + mat.weight) * 30,
          cooldown: mat.weight * (1 - mat.toughness) * 2000,
          knockback: 0,
          range: 0
        };
        aspects = mix(parts, data);
        effects = computeSolution(aspects);
        texture = {
          type: 'composite',
          overlay: {
            type: 'single',
            tex: 'sprites/items/bow-string',
            tint: blendPartColors([parts[3], parts[5]])
          },
          base: {
            type: 'single',
            tex: 'sprites/items/bow',
            tint: blendPartColors([parts[0], parts[1], parts[2], parts[4]])
          }
        };
        break;
      case AssemblyType.Arrow:
        weapon = {
          type: Weapon.Type.Arrow,
          strength: mat.weight * (1 + mat.sharpness) * 20,
          cooldown: 0,
          knockback: 0,
          range: 8 + mat.toughness * 10
        };
        aspects = scaleAspects(mix(parts, data), Math.pow(mat.affinity, 0.5));
        effects = computeSolution(aspects);
        texture = {
          type: 'composite',
          base: {
            type: 'single',
            tex: 'sprites/items/arrow',
            tint: (parts[1].texture as any).tint || 'ffffff'
          },
          overlay: {
            type: 'composite',
            base: {
              type: 'single',
              tex: 'sprites/items/arrow-head',
              tint: (parts[0].texture as any).tint || 'ffffff'
            },
            overlay: {
              type: 'single',
              tex: 'sprites/items/arrow-fletch',
              tint: (parts[2].texture as any).tint || 'ffffff'
            }
          }
        };
        break;
      case AssemblyType.Chestplate:
        itemType = Item.Type.Chestplate;
        [effects, aspects] = computeArmors(parts, mat, 1, data);
        texture = {
          type: 'composite',
          base: {
            type: 'single',
            tex: 'sprites/items/chestplate',
            tint: (parts[3].texture as any).tint || 'ffffff'
          },
          overlay: {
            type: 'composite',
            base: {
              type: 'single',
              tex: 'sprites/items/chestplate-belt',
              tint: (parts[2].texture as any).tint || 'ffffff'
            },
            overlay: {
              type: 'composite',
              base: {
                type: 'single',
                tex: 'sprites/items/chestplate-left',
                tint: (parts[0].texture as any).tint || 'ffffff'
              },
              overlay: {
                type: 'single',
                tex: 'sprites/items/chestplate-right',
                tint: (parts[1].texture as any).tint || 'ffffff'
              }
            }
          }
        };
        break;
      case AssemblyType.Leggings:
        itemType = Item.Type.Leggings;
        [effects, aspects] = computeArmors(parts, mat, 0.7, data);
        texture = {
          type: 'composite',
          base: {
            type: 'single',
            tex: 'sprites/items/leggings',
            tint: (parts[0].texture as any).tint || 'ffffff'
          },
          overlay: {
            type: 'composite',
            base: {
              type: 'single',
              tex: 'sprites/items/leggings-left',
              tint: (parts[1].texture as any).tint || 'ffffff'
            },
            overlay: {
              type: 'single',
              tex: 'sprites/items/leggings-right',
              tint: (parts[2].texture as any).tint || 'ffffff'
            }
          }
        };
        break;
      case AssemblyType.Boots:
        itemType = Item.Type.Boots;
        [effects, aspects] = computeArmors(parts, mat, 0.4, data);
        texture = {
          type: 'composite',
          base: {
            type: 'single',
            tex: 'sprites/items/boots',
            tint: (parts[0].texture as any).tint || 'ffffff'
          },
          overlay: {
            type: 'single',
            tex: 'sprites/items/boots-right',
            tint: (parts[1].texture as any).tint || 'ffffff'
          }
        };
        break;
      default:
        console.error('unexpected type');
        return null;
    }
    console.log(weapon);
    console.log(effects);

    return {
      id: type,
      name: startCase(type),
      type: itemType,
      texture,
      aspects,
      effects,
      material: mat,
      weapon
    };
  }
}