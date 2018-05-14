import { App } from 'app';
import { TextToolTip } from 'app/components/TextToolTip';
import { Item } from 'common/data';
import { ceil, startCase } from 'lodash';

export class ItemToolTip extends TextToolTip {
  private item: Item;

  constructor(app: App, item: Item) {
    super(app, '', {
      default: { align: 'left' },
      label: { fontWeight: 'bold' },
      details: { fill: '#d0d0d0' },
      desc: { fontStyle: 'italic' },
    });
    this.item = item;
    this.updateView();
  }

  public setItem(item: Item) {
    if (this.item !== item) {
      this.item = item;
      this.updateView();
    }
  }

  private updateView() {
    const texts: string[] = [
      `<label>${this.item.name}</label>`,
      `<details>${startCase(this.item.type)}</details>`
    ];

    if (this.item.description)
      texts.push(`<desc>${this.item.description}</desc>`);

    if (this.item.aspects && this.item.aspects.length > 0) {
      texts.push('');
      let sum = 0;
      for (const { amount } of this.item.aspects)
        sum += amount;
      for (const { element, amount } of this.item.aspects.slice().sort((a, b) => b.amount - a.amount)) {
        const percentage = amount / sum * 100;
        if (percentage < 10) continue;
        texts.push(`<details>${percentage.toFixed(0)}% <label>${element}</label></details>`);
      }
    }
    if (this.item.effects && this.item.effects.length > 0) {
      texts.push('');
      if (this.item.material && this.item.weapon) {
        const affinity = this.item.material.affinity;
        if (affinity < 0.2) texts.push('<details>rarely inflicts effects:</details>');
        else if (affinity < 0.5) texts.push('<details>sometimes inflicts effects:</details>');
        else if (affinity < 0.7) texts.push('<details>often inflicts effects:</details>');
        else texts.push('<details>inflicts effects:</details>');
      }
      for (const effect of this.item.effects) {
        texts.push(`<details>\u2022 ${effect.description}</details>`);
      }
    }
    if (this.item.weapon) {
      texts.push('');
      texts.push(`<details>strength  <label>${ceil(this.item.weapon.strength, 1)}</label> </details>`);
      if (this.item.weapon.cooldown)
        texts.push(`<details>cooldown  <label>${ceil(this.item.weapon.cooldown / 1000, 1)}s</label></details>`);
      if (this.item.weapon.range)
        texts.push(`<details>range  <label>${ceil(this.item.weapon.range, 1)} tiles</label></details>`);
    }

    this.text = texts.join('\n');
  }
}