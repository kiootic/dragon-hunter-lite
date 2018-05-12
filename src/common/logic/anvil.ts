import { blend } from 'common/color';
import { Aspect, Effect, Element, Item, MaterialStats, TextureDef, Weapon } from 'common/data';
import { mix } from 'common/logic/alchemy';
import { compute as computeArmors } from 'common/logic/effect/armors';
import { scaleAspects } from 'common/logic/effect/common';
import { compute as computeSolution } from 'common/logic/effect/solution';
import { countBy, startCase } from 'lodash';

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

const Parts: Record<Exclude<AssemblyType, AssemblyType.Infusion>, MaterialStats[]> = {
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
      const aspects = mix(parts, data);
      return Object.assign({}, parts[1], { effects: computeSolution(aspects) });
    } else {
      const [effects, aspects] = computeArmors(parts, material, 1, data);
      return Object.assign({}, parts[1], { aspects, effects });
    }
  } else {
    const mat: MaterialStats = { weight: 0, toughness: 0, sharpness: 0, affinity: 0 };
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
      return blend(parts.map(({ material }) => ({
        color: parseInt(material!.color, 16)
      }))).toString(16);
    }

    let materialName = '';
    let matColor = 'ffffff';
    function mainParts(parts: Item[]) {
      const materialCounts = countBy(parts.map(part => part.material!.name));
      let maxMaterial = 0;
      for (const material of Object.keys(materialCounts))
        if (materialCounts[material] > maxMaterial) {
          materialName = material;
          maxMaterial = materialCounts[material];
        }
      matColor = blendPartColors(parts);
    }

    switch (type) {
      case AssemblyType.Sword:
        mainParts(parts.slice(0, 2));
        weapon = {
          type: Weapon.Type.Sword,
          strength: mat.sharpness * (1 + mat.weight) * (1 + mat.toughness) * 100,
          cooldown: mat.weight * (1 - mat.toughness) * 5000,
          knockback: mat.weight * (1 + mat.sharpness) * 10,
          pierce: true,
          range: 2.5,
          color: matColor
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
            tint: parts[2].material!.color
          }
        };
        break;
      case AssemblyType.Spear:
        mainParts(parts.slice(0, 1));
        weapon = {
          type: Weapon.Type.Spear,
          strength: mat.sharpness * (1 + mat.weight) * (1 + mat.toughness) * 250,
          cooldown: mat.weight * (1 - mat.toughness) * 15000,
          knockback: mat.weight * (1 + mat.sharpness) * 20,
          pierce: true,
          range: 4,
          color: matColor
        };
        aspects = mix(parts, data);
        effects = computeSolution(aspects);
        texture = {
          type: 'composite',
          overlay: {
            type: 'single',
            tex: 'sprites/items/spear-head',
            tint: parts[0].material!.color
          },
          base: {
            type: 'single',
            tex: 'sprites/items/spear',
            tint: blendPartColors(parts.slice(1, 3))
          }
        };
        break;
      case AssemblyType.Bow:
        mainParts([parts[0], parts[1], parts[2], parts[4]]);
        weapon = {
          type: Weapon.Type.Bow,
          strength: mat.toughness * (1 + mat.weight) * 20,
          cooldown: mat.weight * (1 - mat.toughness) * 1000,
          knockback: 0,
          range: 0,
          color: matColor
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
        mainParts(parts.slice(0, 1));
        weapon = {
          type: Weapon.Type.Arrow,
          strength: mat.weight * (1 + mat.sharpness) * 10,
          cooldown: 0,
          knockback: 0,
          range: 5 + mat.toughness * 15,
          color: matColor
        };
        aspects = scaleAspects(mix(parts, data), Math.pow(mat.affinity, 0.5));
        effects = computeSolution(aspects);
        texture = {
          type: 'composite',
          base: {
            type: 'single',
            tex: 'sprites/items/arrow',
            tint: parts[1].material!.color
          },
          overlay: {
            type: 'composite',
            base: {
              type: 'single',
              tex: 'sprites/items/arrow-head',
              tint: parts[0].material!.color
            },
            overlay: {
              type: 'single',
              tex: 'sprites/items/arrow-fletch',
              tint: parts[2].material!.color
            }
          }
        };
        break;
      case AssemblyType.Chestplate:
        mainParts(parts);
        itemType = Item.Type.Chestplate;
        [effects, aspects] = computeArmors(parts, mat, 1, data);
        texture = {
          type: 'composite',
          base: {
            type: 'single',
            tex: 'sprites/items/chestplate',
            tint: parts[3].material!.color
          },
          overlay: {
            type: 'composite',
            base: {
              type: 'single',
              tex: 'sprites/items/chestplate-belt',
              tint: parts[2].material!.color
            },
            overlay: {
              type: 'composite',
              base: {
                type: 'single',
                tex: 'sprites/items/chestplate-left',
                tint: parts[0].material!.color
              },
              overlay: {
                type: 'single',
                tex: 'sprites/items/chestplate-right',
                tint: parts[1].material!.color
              }
            }
          }
        };
        break;
      case AssemblyType.Leggings:
        mainParts(parts);
        itemType = Item.Type.Leggings;
        [effects, aspects] = computeArmors(parts, mat, 0.5, data);
        texture = {
          type: 'composite',
          base: {
            type: 'single',
            tex: 'sprites/items/leggings',
            tint: parts[0].material!.color
          },
          overlay: {
            type: 'composite',
            base: {
              type: 'single',
              tex: 'sprites/items/leggings-left',
              tint: parts[1].material!.color
            },
            overlay: {
              type: 'single',
              tex: 'sprites/items/leggings-right',
              tint: parts[2].material!.color
            }
          }
        };
        break;
      case AssemblyType.Boots:
        mainParts(parts);
        itemType = Item.Type.Boots;
        [effects, aspects] = computeArmors(parts, mat, 0.2, data);
        texture = {
          type: 'composite',
          base: {
            type: 'single',
            tex: 'sprites/items/boots',
            tint: parts[0].material!.color
          },
          overlay: {
            type: 'single',
            tex: 'sprites/items/boots-right',
            tint: parts[1].material!.color
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
      name: `${materialName} ${startCase(type)}`,
      type: itemType,
      texture,
      aspects,
      effects,
      material: { name: materialName, color: matColor, ...mat },
      weapon
    };
  }
}