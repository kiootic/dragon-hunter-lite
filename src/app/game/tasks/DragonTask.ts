import { Game } from 'app/game';
import { ActionState } from 'app/game/behavior';
import { Shoot, Wander } from 'app/game/behavior/actions';
import { HP } from 'app/game/behavior/conditions';
import { Attacks, Conditions, Movements } from 'app/game/behavior/genes';
import { Enemy } from 'app/game/entities';
import { SpawnEnemy } from 'app/game/messages';
import { Task } from 'app/game/tasks';
import { random as randomColor } from 'common/color';
import { EnemyDef, Weapon } from 'common/data';
import { begin, nextGeneration, GeneticAlgorithm } from 'common/logic/genetic';
import { generateName } from 'common/markov';
import { Animations } from 'data/animations';
import { cloneDeep } from 'lodash';
import { filter } from 'rxjs/operators/filter';

interface DragonDef extends EnemyDef {
  id: number;
}

const DragonDefTemplate: DragonDef = {
  id: 0,
  name: '',
  texture: Animations.Dragon,
  scale: 2,
  horizontalAnim: true,
  offset: [0, -1],
  behaviors: { activeStateIndex: -1, states: [] },
  drops: { numDrops: { type: 'constant', value: 0 }, items: [] },
  stats: {
    hp: 200,
    maxHp: 200,
    str: 10,
    def: 0,
    spd: 5,
    vit: 0
  }
};

function touchShoot() {
  return Shoot.make({
    type: Weapon.Type.Invisible,
    pierce: true,
    strength: 5,
    cooldown: 100,
    knockback: 10,
    range: 2,
    color: '0'
  }, [], 100);
}

export class DragonTask extends Task implements GeneticAlgorithm<DragonDef> {
  private thisGeneration: DragonDef[];
  private instancePool: DragonDef[];

  constructor(game: Game) {
    super(game);
    this.game.messages$.ofType(SpawnEnemy)
      .pipe(filter(msg => msg.enemyType === 'dragon'))
      .subscribe(this.spawn);

    this.thisGeneration = begin(this);
    this.instancePool = this.thisGeneration.slice();
  }

  private spawn = ({ position }: SpawnEnemy) => {
    if (this.instancePool.length === 0) {
      this.thisGeneration = nextGeneration(this, this.thisGeneration);
      this.instancePool = this.thisGeneration.slice();
    }

    const def = this.instancePool.pop()!;
    console.log(JSON.stringify(def, null, 4));
    const entity = Enemy.make(this.game, def, position);
    this.game.entities.add(entity);
  }

  seed() {
    const color = randomColor(
      { type: 'uniform', min: 0.6, max: 0.8 },
      { type: 'uniform', min: 0.6, max: 0.8 }
    );

    const instance = cloneDeep(DragonDefTemplate);
    instance.name = generateName(6, 12);
    instance.texture = Object.assign({}, Animations.Dragon, { tint: color });

    function randomRange(max: number) {
      return Math.floor(Math.random() * max);
    }
    for (let i = 0; i < 4; i++) {
      // first state is basic state
      const state = {
        condition: i === 0 ? HP.greaterThan(0) : Conditions[Math.floor(Math.random() * Conditions.length)](),
        actions: [] as ActionState[]
      };

      const numAttacks = 1 + randomRange(2);
      for (let j = 0; j < numAttacks; j++)
        state.actions.push(Attacks[randomRange(Attacks.length)](color));
      state.actions.push(Movements[randomRange(Movements.length)]());

      // basic actions
      state.actions.push(touchShoot());
      state.actions.push(Wander.make());

      instance.behaviors.states.push(state);
    }

    return instance;
  }
  evaluate(instance: any): number {
    return 0;
  }
  crossover(a: any, b: any) {
    return cloneDeep(a);
  }
  mutate(instance: any) {
    return cloneDeep(instance);
  }

}