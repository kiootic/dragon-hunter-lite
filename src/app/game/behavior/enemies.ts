import * as a from 'app/game/behavior/actions';
import * as c from 'app/game/behavior/conditions';
import { EnemyDef, Item, Weapon } from 'common/data';
import { makeEffect } from 'common/logic/effect/common';
import { Animations } from 'data/animations';
import { EffectDef } from 'data/effects';

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
  egg: {
    name: 'Egg',
    texture: 'sprites/dragons/egg',
    scale: 1,
    horizontalAnim: false,
    offset: [0, -0.25],
    behaviors: {
      activeStateIndex: -1,
      states: [{
        condition: c.HP.greaterThan(0.99),
        actions: [
          a.Buff.make([makeEffect(EffectDef.Type.KnockbackResist, 0, 1000)], 500)
        ]
      }, {
        condition: c.HP.lessThan(0.99),
        actions: [
          a.Spawn.make('dragon', 0),
          a.Suicide.make()
        ]
      }]
    },
    drops: {
      numDrops: { type: 'constant', value: 0 },
      items: []
    },
    stats: {
      hp: 10000,
      maxHp: 10000,
      str: 0,
      def: 0,
      spd: 0,
      vit: 10
    }
  },
  spawner: {
    name: 'Skeleton Spawner',
    texture: 'sprites/skeleton/spawner',
    scale: 1,
    horizontalAnim: false,
    offset: [0, -0.25],
    behaviors: {
      activeStateIndex: -1,
      states: [{
        condition: c.HP.greaterThan(0),
        actions: [
          a.Buff.make([makeEffect(EffectDef.Type.KnockbackResist, 0, 1000)], 500),
        ]
      }, {
        condition: c.Distance.lessThan(8),
        actions: [
          a.Buff.make([makeEffect(EffectDef.Type.KnockbackResist, 0, 1000)], 500),
          a.Spawn.make('skeleton', 10000),
          a.Shoot.make({
            type: Weapon.Type.Bolt,
            pierce: true,
            strength: 10,
            cooldown: 5000,
            knockback: 10,
            range: 10,
            color: '404040'
          }, [], 1000, 10, 36)
        ]
      }]
    },
    drops: {
      numDrops: { type: 'constant', value: 0 },
      items: []
    },
    stats: {
      hp: 100,
      maxHp: 150,
      str: 10,
      def: 0,
      spd: 0,
      vit: 5
    }
  }
};