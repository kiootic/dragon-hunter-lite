import { Text, TextureSprite } from 'app/components';
import { Game } from 'app/game';
import { MenuPanel } from 'app/game/menu';
import { EnemyData, PlayerData, Stats } from 'app/game/traits';
import { Container, Texture } from 'pixi.js';

const HPBarWidth = 256;
const HPBarHeight = 32;

export class EnemyInfo extends MenuPanel {
  readonly name = 'Enemy Info';
  readonly icon = Texture.fromFrame('sprites/ui/tab-enemy');

  private readonly enemyTex = new TextureSprite();
  private readonly nameLabel = new Text('', { align: 'left' });

  private readonly hpBar = new Container();
  private readonly hpBarIcon = new TextureSprite(Texture.fromFrame('sprites/ui/status-hp'));
  private readonly hpBarBg = new TextureSprite(Texture.WHITE);
  private readonly hpBarFill = new TextureSprite(Texture.WHITE);
  private readonly hpBarText = new Text();

  constructor(private readonly game: Game) {
    super();

    this.enemyTex.animName = 'right';

    this.hpBarBg.tint = 0x808080;
    this.hpBarBg.width = HPBarWidth;
    this.hpBarBg.height = HPBarHeight;

    this.hpBar.addChild(this.hpBarBg);
    this.hpBar.addChild(this.hpBarFill);
    this.hpBar.addChild(this.hpBarText);
    this.addChild(this.hpBarIcon);
    this.addChild(this.hpBar);
    this.addChild(this.enemyTex);
    this.addChild(this.nameLabel);
  }

  private getEnemy() {
    const { lastAttackId } = this.game.player.traits.get(PlayerData);
    const target = this.game.entities.get(lastAttackId);
    if (!target)
      return null;
    if (!target.traits.get(EnemyData))
      return null;
    return target;
  }

  update() {
    const enemy = this.getEnemy();
    if (!enemy) {
      this.enemyTex.clearTexture();
      this.hpBarIcon.visible = false;
      this.hpBar.visible = false;
      this.nameLabel.text = 'none';
      return;
    }

    const { def } = enemy.traits.get(EnemyData);
    const { hp, maxHp } = Stats.compute(enemy.traits.get(Stats));
    this.enemyTex.setTexture(def.texture);
    this.enemyTex.update(0);
    this.nameLabel.text = def.name;

    this.hpBarIcon.visible = true;
    this.hpBar.visible = true;
    const percentage = hp / maxHp;
    this.hpBarText.text = `${Math.ceil(hp)}/${maxHp}`;
    this.hpBarFill.width = HPBarWidth * percentage;
    this.hpBarFill.height = HPBarHeight;

    if (percentage < 0.3) this.hpBarFill.tint = 0xa00000;
    else if (percentage < 0.6) this.hpBarFill.tint = 0xa0a000;
    else this.hpBarFill.tint = 0x00a000;
  }

  layout(width: number, height: number) {
    this.enemyTex.position.set(0, 0);
    this.nameLabel.position.set(80, 0);
    this.nameLabel.layout(256, 64);

    this.hpBarIcon.position.set(0, 96);
    this.hpBar.position.set(48, 96);
    this.hpBarText.layout(HPBarWidth, HPBarHeight);
  }
}