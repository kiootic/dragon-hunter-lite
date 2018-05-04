import { Text } from 'app/components';
import { Game } from 'app/game';
import { HUDElement } from 'app/game/hud';
import { Stats, StatList } from 'app/game/traits';
import { Container, Sprite, Texture } from 'pixi.js';

const HPBarWidth = 256;
const HPBarHeight = 32;

export class Status extends Container implements HUDElement {
  public readonly display = this;

  private readonly stats: StatList;

  private readonly hpBarIcon = new Sprite(Texture.fromFrame('sprites/ui/status-hp'));
  private readonly hpBarBg = new Sprite(Texture.WHITE);
  private readonly hpBarFill = new Sprite(Texture.WHITE);
  private readonly hpBarText = new Text();

  constructor(game: Game) {
    super();
    this.stats = Stats.compute(game.player.traits(Stats));

    this.hpBarBg.tint = 0x808080;
    this.hpBarBg.width = HPBarWidth;
    this.hpBarBg.height = HPBarHeight;

    this.addChild(this.hpBarBg);
    this.addChild(this.hpBarFill);
    this.addChild(this.hpBarText);
    this.addChild(this.hpBarIcon);

    this.alpha = 0.65;
    this.hpBarText.visible = false;
    this.interactive = true;
    this.on('pointerover', () => {
      this.alpha = 1;
      this.hpBarText.visible = true;
    });
    this.on('pointerout', () => {
      this.alpha = 0.65;
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
  }

  layout(width: number, height: number) {
    const hpBarX = width - HPBarWidth - 16, hpBarY = 256 + 32;
    this.hpBarBg.position.set(hpBarX, hpBarY);
    this.hpBarFill.position.set(hpBarX, hpBarY);
    this.hpBarText.position.set(hpBarX, hpBarY);
    this.hpBarText.layout(HPBarWidth, HPBarHeight);
    this.hpBarIcon.position.set(hpBarX - this.hpBarIcon.width - 4, hpBarY);
  }
}