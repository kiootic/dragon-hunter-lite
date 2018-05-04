import { App } from 'app';
import { TextToolTip } from 'app/components/TextToolTip';
import { Item } from 'common/data';
import { startCase } from 'lodash';

export class ItemToolTip extends TextToolTip {
  private item: Item;

  constructor(app: App, item: Item) {
    super(app, '', {
      default: { align: 'left' },
      name: { fontWeight: 'bold' },
      type: { fill: '#d0d0d0' },
      desc: { fill: '#d0d0d0', fontStyle: 'italic' },
      aspect: { fill: '#d0d0d0' },
      elem: { fontWeight: 'bold' },
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
      `<name>${this.item.name}</name>`,
      `<type>${startCase(this.item.type)}</type>`
    ];

    if (this.item.description)
      texts.push(`<desc>${this.item.description}</desc>`);

    if (this.item.aspects) {
      let sum = 0;
      for (const { amount } of this.item.aspects)
        sum += amount;
      for (const { element, amount } of this.item.aspects.slice().sort((a, b) => b.amount - a.amount)) {
        const percentage = amount / sum * 100;
        if (percentage < 10) continue;
        texts.push(`<aspect>${percentage.toFixed(0)}% <elem>${element}</elem></aspect>`);
      }
    }
    this.text = texts.join('\n');
  }
}