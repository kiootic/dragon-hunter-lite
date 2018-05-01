import { App } from 'app';
import { Panel } from 'app/components';
import { Item } from 'common/data';

export class ItemToolTip extends Panel {
  private item: Item;

  constructor(app: App, item: Item) {
    super(app);
    this.item = item;
    this.updateView();
  }

  public setItem(item: Item) {
    this.item = item;
    this.updateView();
  }

  private updateView() {
    console.log(this.item);
  }

  layout() {
    super.layout(600, 400);
  }
}