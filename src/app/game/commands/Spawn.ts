import { Chase, Escape, Shoot, Wander } from 'app/game/behavior/actions';
import { HP } from 'app/game/behavior/conditions';
import { Command } from 'app/game/commands';
import { Enemy, Entity } from 'app/game/entities';
import { Behavior, EnemyData, Spatial, Stats } from 'app/game/traits';
import { Item, Weapon } from 'common/data';

export class Spawn extends Command {
  readonly name = 'spawn';

  exec(type: string) {
    let entity: Entity;
    switch (type) {
      case 'skeleton':
        entity = Enemy.make(this.game, 'Skeleton', this.game.player.traits.get(Spatial).position);
        entity.traits.set(Behavior.make({
          activeStateIndex: -1,
          states: [{
            condition: HP.greaterThan(0.7),
            actions: [
              Chase.make(),
              Wander.make(),
              Shoot.make({
                type: Weapon.Type.Bolt,
                pierce: true,
                strength: 5,
                cooldown: 500,
                knockback: 10,
                range: 1,
                color: '000000'
              }, [], 100)
            ]
          }, {
            condition: HP.lessThan(0.5),
            actions: [
              Escape.make(),
              Wander.make()
            ]
          }]
        }));
        entity.traits.get(EnemyData).drops = {
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
        };
        entity.traits.get(Stats).base.spd = 5;
        break;
      default:
        this.log('unknown type: ' + type);
        return;
    }
    this.game.entities.add(entity);
  }
}
Command.register(new Spawn());