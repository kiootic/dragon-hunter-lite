import { App } from 'app';
import { TextToolTip } from 'app/components/TextToolTip';
import { Item } from 'common/data';
import { startCase } from 'lodash';

export class ItemToolTip extends TextToolTip {
  private item: Item;

  constructor(app: App, item: Item) {
    super(app, '', {
      default: {
        align: 'left'
      },
      name: {
        fontWeight: 'bold'
      },
      type: {
        fill: '#d0d0d0'
      }
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
    this.text = `<name>${this.item.name}</name>
<type>${startCase(this.item.type)}</type>`;
  }
}