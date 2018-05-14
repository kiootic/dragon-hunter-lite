import { Game } from 'app/game';
import { ActionState, BehaviorTree } from 'app/game/behavior';
import { Shoot, Wander } from 'app/game/behavior/actions';
import { HP } from 'app/game/behavior/conditions';
import { Attacks, Conditions, Movements } from 'app/game/behavior/genes';
import { Enemy } from 'app/game/entities';
import { SpawnEnemy } from 'app/game/messages';
import { Task } from 'app/game/tasks';
import { EnemyData, Stats } from 'app/game/traits';
import { random as randomColor } from 'common/color';
import { DropTable, EnemyDef, Item, Weapon } from 'common/data';
import { begin, nextGeneration, GeneticAlgorithm } from 'common/logic/genetic';
import { generateName } from 'common/markov';
import { Animations } from 'data/animations';
import { clamp, cloneDeep, meanBy, shuffle } from 'lodash';
import { filter } from 'rxjs/operators/filter';

interface DragonDef extends EnemyDef {
  dragonId: number;
  color: string;
  maxDPS: number;
  minPlayerHP: number;
  age: number;
  score: number;
}

function randomRange(max: number) {
  return Math.floor(Math.random() * max);
}

const DragonDefTemplate: DragonDef = {
  dragonId: 0,
  maxDPS: 0,
  color: '',
  minPlayerHP: 100000,
  age: 0,
  score: 0,

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

interface GeneticSave {
  readonly dragons: DragonDef[];
  nextId: number;
}

export class DragonTask extends Task implements GeneticAlgorithm<DragonDef> {
  private thisGeneration: DragonDef[] = [];
  private instancePool: DragonDef[] = [];
  private data: GeneticSave;

  constructor(game: Game) {
    super(game);
    this.game.messages$.ofType(SpawnEnemy)
      .pipe(filter(msg => msg.enemyType === 'dragon'))
      .subscribe(this.spawn);

    this.data = this.game.data.custom.dragons || (this.game.data.custom.dragons = {
      dragons: [],
      nextId: 0
    });
    this.nextGen(begin(this));
  }

  private nextGen(generation: DragonDef[]) {
    this.thisGeneration = generation.map(dragon => {
      dragon.dragonId = this.data.nextId++;
      this.computeDrops(dragon);
      this.data.dragons[dragon.dragonId] = dragon;
      return dragon;
    });
    this.instancePool = this.thisGeneration.slice();
  }

  private spawn = ({ position }: SpawnEnemy) => {
    if (this.instancePool.length === 0) {
      this.nextGen(nextGeneration(this, this.thisGeneration));
    }

    const def = this.instancePool.pop()!;
    const entity = Enemy.make(this.game, def, position);
    this.game.entities.add(entity);
  }

  private interval = 0;
  private lastPlayerHP = -1;
  update(dt: number) {
    this.interval -= dt;

    const playerHP = this.game.player.traits.get(Stats).base.hp;
    if (this.lastPlayerHP < 0) this.lastPlayerHP = playerHP;

    for (const enemy of this.game.entities.withTrait(EnemyData)) {
      const { def } = enemy.traits.get(EnemyData);
      const dragonId = (def as DragonDef).dragonId;
      if (typeof dragonId !== 'number')
        continue;

      const dragonDef = this.data.dragons[dragonId];
      dragonDef.minPlayerHP = Math.min(dragonDef.minPlayerHP, playerHP);
      if (this.interval <= 0)
        dragonDef.maxDPS = Math.max(dragonDef.maxDPS, Math.max(0, this.lastPlayerHP - playerHP));
      dragonDef.age = enemy.age;
    }

    if (this.interval <= 0) {
      this.lastPlayerHP = playerHP;
      this.interval = 1000;
    }
  }

  private makeRandomState(color: string) {
    const state = {
      condition: Conditions[Math.floor(Math.random() * Conditions.length)](),
      actions: [] as ActionState[]
    };

    const numAttacks = 1 + randomRange(2);
    for (let j = 0; j < numAttacks; j++)
      state.actions.push(Attacks[randomRange(Attacks.length)](color));
    state.actions.push(Movements[randomRange(Movements.length)]());

    // basic actions
    state.actions.push(touchShoot());
    state.actions.push(Wander.make());
    return state;
  }

  seed() {
    const color = randomColor(
      { type: 'uniform', min: 0.6, max: 0.8 },
      { type: 'uniform', min: 0.6, max: 0.8 }
    );

    const instance = cloneDeep(DragonDefTemplate);
    instance.name = generateName(6, 12);
    instance.color = color;
    instance.texture = Object.assign({}, Animations.Dragon, { tint: color });

    for (let i = 0; i < 4; i++) {
      const state = this.makeRandomState(color);
      // first state is basic state
      if (i === 0)
        state.condition = HP.greaterThan(0);
      instance.behaviors.states.push(state);
    }

    return instance;
  }

  evaluate(instance: DragonDef): number {
    const dragonDef = this.data.dragons[instance.dragonId];
    const ageScore = clamp(Math.abs(dragonDef.age - 60 * 1000) / 60000, 0, 1);
    const dpsScore = clamp(Math.abs(dragonDef.maxDPS - 20) / 10, 0, 1);
    const hpScore = clamp(Math.abs(dragonDef.minPlayerHP - 50) / 50, 0, 1);
    const finalScore = 1 - (ageScore + dpsScore + hpScore) / 3;
    console.log(`evaluate ${instance.dragonId}: ${finalScore}`);
    dragonDef.score = finalScore;
    return finalScore;
  }

  adjustStats(instances: DragonDef[], target: DragonDef) {
    const ageScore = clamp(meanBy(instances, dragon => dragon.age - 60 * 1000) / 60000, -1, 1);
    const dpsScore = clamp(meanBy(instances, dragon => dragon.maxDPS - 20) / 10, -1, 1);
    const hpScore = clamp(meanBy(instances, dragon => dragon.minPlayerHP - 50) / 50, -1, 1);
    target.stats.maxHp = meanBy(instances, dragon => dragon.stats.maxHp) * (1 - ageScore / 2);
    target.stats.hp = target.stats.maxHp;
    target.stats.str = meanBy(instances, dragon => dragon.stats.str) * (1 - dpsScore / 2);
    target.stats.spd = meanBy(instances, dragon => dragon.stats.spd) * (1 - hpScore / 2);
    console.log('stats', target.stats);
  }

  computeDrops(dragon: DragonDef) {
    const drops: DropTable = {
      numDrops: { type: 'exponential', min: 3, max: 6, rate: 0.5 },
      items: []
    };
    const baseWeight = dragon.stats.maxHp / 2000 - dragon.stats.spd / 200 + Math.random() * 0.1;
    const baseToughness = dragon.stats.maxHp / 2000 + Math.random() * 0.1;
    const baseSharpness = dragon.stats.str / 100 + Math.random() * 0.1;
    const affinity = clamp((dragon.stats.maxHp / 1000 + dragon.stats.spd / 100 + dragon.stats.str / 50) / 3, 0, 1);
    drops.items.push({
      prob: 0.3, item: {
        template: {
          id: 'skin',
          name: `Skin of ${dragon.name}`,
          type: Item.Type.Material,
          texture: { type: 'single', tex: 'sprites/items/skin', tint: dragon.color },
          material: {
            name: dragon.name,
            color: dragon.color,
            weight: clamp(baseWeight * 1, 0, 1),
            toughness: clamp(baseToughness * 1.5, 0, 1),
            sharpness: clamp(baseSharpness * 0.5, 0, 1),
            affinity,
          },
        },
        substs: []
      }
    }, {
        prob: 0.3, item: {
          template: {
            id: 'bone',
            name: `Bone of ${dragon.name}`,
            type: Item.Type.Material,
            texture: { type: 'single', tex: 'sprites/items/bone', tint: dragon.color },
            material: {
              name: dragon.name,
              color: dragon.color,
              weight: clamp(baseWeight * 1.5, 0, 1),
              toughness: clamp(baseToughness * 1.5, 0, 1),
              sharpness: clamp(baseSharpness * 1, 0, 1),
              affinity,
            },
          },
          substs: []
        }
      }, {
        prob: 0.2, item: {
          template: {
            id: 'fang',
            name: `Fang of ${dragon.name}`,
            type: Item.Type.Material,
            texture: { type: 'single', tex: 'sprites/items/fang', tint: dragon.color },
            material: {
              name: dragon.name,
              color: dragon.color,
              weight: clamp(baseWeight * 0.5, 0, 1),
              toughness: clamp(baseToughness * 0.5, 0, 1),
              sharpness: clamp(baseSharpness * 2, 0, 1),
              affinity,
            },
          },
          substs: []
        }
      }, {
        prob: 0.2, item: {
          template: {
            id: 'scale',
            name: `Scale of ${dragon.name}`,
            type: Item.Type.Material,
            texture: { type: 'single', tex: 'sprites/items/scale', tint: dragon.color },
            material: {
              name: dragon.name,
              color: dragon.color,
              weight: clamp(baseWeight * 0.5, 0, 1),
              toughness: clamp(baseToughness * 2, 0, 1),
              sharpness: clamp(baseSharpness * 1, 0, 1),
              affinity,
            },
          },
          substs: []
        }
      });
    dragon.drops = drops;
  }

  crossover(a: DragonDef, b: DragonDef) {
    console.log(`crossover: ${a.dragonId} ${b.dragonId}`);
    const newDragon = this.seed();

    const candidateStates = [
      ...cloneDeep(a.behaviors.states.slice(1)),
      ...cloneDeep(b.behaviors.states.slice(1))
    ];
    const states = shuffle(candidateStates).slice(candidateStates.length / 2);
    newDragon.behaviors.states = [newDragon.behaviors.states[0], ...states];
    this.adjustStats([a, b], newDragon);
    return newDragon;
  }

  mutate(instance: DragonDef) {
    console.log(`mutate: ${instance.dragonId}`);
    const newDragon = this.seed();
    newDragon.behaviors = cloneDeep(instance.behaviors);

    const stateIndex = Math.floor(Math.random() * (newDragon.behaviors.states.length + 1));
    if (stateIndex < newDragon.behaviors.states.length) {
      const state = newDragon.behaviors.states[stateIndex];
      state.condition = BehaviorTree.conditions.get(state.condition.type)!.mutate(state.condition);

      const actionIndex = Math.floor(Math.random() * state.actions.length);
      const action = state.actions[actionIndex];
      state.actions[actionIndex] = BehaviorTree.actions.get(action.type)!.mutate(action);
    } else {
      const state = this.makeRandomState(newDragon.color);
      instance.behaviors.states.push(state);
    }
    this.adjustStats([instance], newDragon);
    return newDragon;
  }

}