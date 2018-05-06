import { Text } from 'app/components';
import { EffectToolTip } from 'app/components/EffectToolTip';
import { Game } from 'app/game';
import { HUDElement } from 'app/game/hud';
import { Stats, StatList } from 'app/game/traits';
import { Effect } from 'common/data';
import { Container, Sprite, Texture } from 'pixi.js';

const HPBarWidth = 256;
const HPBarHeight = 32;

export class Status extends Container implements HUDElement {
  public readonly display = this;

  private readonly stats: StatList;
  private readonly effects: Effect[];

  private readonly hpBarIcon = new Sprite(Texture.fromFrame('sprites/ui/status-hp'));
  private readonly hpBarBg = new Sprite(Texture.WHITE);
  private readonly hpBarFill = new Sprite(Texture.WHITE);
  private readonly hpBarText = new Text();

  private readonly effectIcons: (Sprite & { effectIndex: number })[] = [];
  private readonly effectToolTip: EffectToolTip;

  constructor(private readonly game: Game) {
    super();
    this.stats = Stats.compute(game.player.traits(Stats));
    this.effects = game.player.traits(Stats).effects;
    this.effectToolTip = new EffectToolTip(game.app);

    this.hpBarBg.tint = 0x808080;
    this.hpBarBg.width = HPBarWidth;
    this.hpBarBg.height = HPBarHeight;

    const hpBar = new Container();
    this.addChild(hpBar);

    hpBar.addChild(this.hpBarBg);
    hpBar.addChild(this.hpBarFill);
    hpBar.addChild(this.hpBarText);
    hpBar.addChild(this.hpBarIcon);

    hpBar.alpha = 0.65;
    this.hpBarText.visible = false;
    hpBar.interactive = true;
    hpBar.on('pointerover', () => {
      hpBar.alpha = 1;
      this.hpBarText.visible = true;
    });
    hpBar.on('pointerout', () => {
      hpBar.alpha = 0.65;
      this.hpBarText.visible = false;
    });
  }

  update(dt: number) {
    const { hp, maxHp } = this.stats;
    const percentage = hp / maxHp;

    this.hpBarText.text = `${hp}/${maxHp}`;
    this.hpBarFill.width = HPBarWidth * percentage;
    this.hpBarFill.height = HPBarHeight;

    if (percentage < 0.3) this.hpBarFill.tint = 0xa00000;
    else if (percentage < 0.6) this.hpBarFill.tint = 0xa0a000;
    else this.hpBarFill.tint = 0x00a000;

    const showEffects = this.effects.filter(({duration}) => duration > 0);
    while (this.effectIcons.length < showEffects.length) {
      const icon = Object.assign(new Sprite(), { effectIndex: 0 });
      icon.interactive = true;
      icon.scale.set(2, 2);
      this.addChild(icon);

      this.game.app.toolTip.add(icon, () => {
        this.effectToolTip.setEffect(this.effects[icon.effectIndex]);
        return this.effectToolTip;
      });
      this.effectIcons.push(icon);
    }
    while (this.effectIcons.length > showEffects.length) {
      this.removeChild(this.effectIcons.splice(this.effectIcons.length - 1, 1)[0]);
    }

    for (let i = 0; i < showEffects.length; i++) {
      this.effectIcons[i].texture = Texture.fromFrame(`sprites/effects/${showEffects[i].type}`);
      this.effectIcons[i].effectIndex = this.effects.indexOf(showEffects[i]);
    }
    this.effectToolTip.update();
  }

  layout(width: number, height: number) {
    const hpBarX = width - HPBarWidth - 16, hpBarY = 256 + 32;
    this.hpBarBg.position.set(hpBarX, hpBarY);
    this.hpBarFill.position.set(hpBarX, hpBarY);
    this.hpBarText.position.set(hpBarX, hpBarY);
    this.hpBarText.layout(HPBarWidth, HPBarHeight);
    this.hpBarIcon.position.set(hpBarX - this.hpBarIcon.width - 4, hpBarY);

    const effectsX = hpBarX, effectsY = hpBarY + HPBarHeight + 16;
    for (let i = 0; i < this.effectIcons.length; i++) {
      this.effectIcons[i].position.set(effectsX + i * (32 + 8), effectsY);
    }
  }
}