import * as a from 'app/game/behavior/actions';
import * as c from 'app/game/behavior/conditions';
import { EnemyDef, Item, Weapon } from 'common/data';
import { Animations } from 'data/animations';

export const Enemies: Record<string, EnemyDef> = {
  skeleton: {
    name: 'Skeleton',
    texture: Animations.Skeleton,
    scale: 1,
    horizontalAnim: false,
    offset: [0, -0.25],
    behaviors: {
      activeStateIndex: -1,
      states: [{
        condition: c.HP.greaterThan(0.7),
        actions: [
          a.Chase.make(),
          a.Wander.make(),
          a.Shoot.make({
            type: Weapon.Type.Invisible,
            pierce: true,
            strength: 5,
            cooldown: 100,
            knockback: 10,
            range: 1,
            color: '000000'
          }, [], 100)
        ]
      }, {
        condition: c.HP.lessThan(0.5),
        actions: [
          a.Escape.make(),
          a.Wander.make(),
          a.Shoot.make({
            type: Weapon.Type.Invisible,
            pierce: true,
            strength: 5,
            cooldown: 100,
            knockback: 10,
            range: 1,
            color: '000000'
          }, [], 100)
        ]
      }]
    },
    drops: {
      numDrops: { type: 'exponential', min: 2, max: 5, rate: 0.7 },
      items: [{
        prob: 1, item: {
          template: {
            id: 'bone',
            name: 'Bone',
            type: Item.Type.Material,
            texture: { type: 'single', tex: 'sprites/items/bone', tint: 'ccb396' },
            material: {
              name: 'Bone',
              color: 'ccb396',
              weight: 0.1,
              toughness: 0.1,
              sharpness: 0.15,
              affinity: 0.15,
            },
          },
          substs: []
        }
      }]
    },
    stats: {
      hp: 50,
      maxHp: 50,
      str: 10,
      def: 0,
      spd: 5,
      vit: 0
    }
  },
  dragon: {
    name: 'Dragon',
    texture: Animations.Dragon,
    scale: 2,
    horizontalAnim: true,
    offset: [0, -1],
    behaviors: {
      activeStateIndex: -1,
      states: [{
        condition: c.HP.greaterThan(0.7),
        actions: [
          a.Chase.make(),
          a.Wander.make(),
          a.Shoot.make({
            type: Weapon.Type.Invisible,
            pierce: true,
            strength: 5,
            cooldown: 100,
            knockback: 10,
            range: 2,
            color: '000000'
          }, [], 100)
        ]
      }, {
        condition: c.HP.lessThan(0.5),
        actions: [
          a.Charge.make(),
          a.Wander.make(),
          a.Shoot.make({
            type: Weapon.Type.Invisible,
            pierce: true,
            strength: 5,
            cooldown: 100,
            knockback: 10,
            range: 2,
            color: '000000'
          }, [], 100)
        ]
      }]
    },
    drops: {
      numDrops: { type: 'exponential', min: 2, max: 5, rate: 0.7 },
      items: [{
        prob: 1, item: {
          template: {
            id: 'bone',
            name: 'Bone',
            type: Item.Type.Material,
            texture: { type: 'single', tex: 'sprites/items/bone', tint: 'ccb396' },
            material: {
              name: 'Bone',
              color: 'ccb396',
              weight: 0.1,
              toughness: 0.1,
              sharpness: 0.15,
              affinity: 0.15,
            },
          },
          substs: []
        }
      }]
    },
    stats: {
      hp: 200,
      maxHp: 200,
      str: 10,
      def: 10,
      spd: 5,
      vit: 10
    }
  }
};