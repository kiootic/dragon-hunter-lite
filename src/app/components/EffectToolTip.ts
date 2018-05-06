import { App } from 'app';
import { TextToolTip } from 'app/components/TextToolTip';
import { Effect } from 'common/data';
import { Sprite, Texture } from 'pixi.js';

export class EffectToolTip extends TextToolTip {
  private effect?: Effect;
  private readonly icon = new Sprite();

  constructor(app: App) {
    super(app, '', {
      default: { align: 'left' },
      s: { fontSize: 12 },
      name: { fontWeight: 'bold', valign: 'middle' },
      desc: { fontStyle: 'italic' },
      time: { fill: '#d0d0d0' }
    });

    this.icon.scale.set(2, 2);
    this.icon.position.set(20, 20);
    this.alpha = 0.75;
    this.addChild(this.icon);
  }

  public setEffect(effect: Effect) {
    this.effect = effect;
    this.icon.texture = Texture.fromFrame(`sprites/effects/${effect.type}`);
    this.update();
  }

  update() {
    if (!this.effect) return;

    const texts: string[] = [
      `<s>     </s><name>${this.effect.name}</name>`,
      `<desc>${this.effect.description}</desc>`,
      `<time>${Math.floor(this.effect.duration / 1000)}s remains</time>`
    ];

    this.text = texts.join('\n');
  }
}