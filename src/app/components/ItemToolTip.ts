import { App } from 'app';
import { Panel } from 'app/components';
import { StyledText } from 'app/components/StyledText';
import { Item } from 'common/data';
import { startCase } from 'lodash';

export class ItemToolTip extends Panel {
  private item: Item;
  private readonly view = new StyledText('', {
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

  constructor(app: App, item: Item) {
    super(app);
    this.item = item;
    this.updateView();
    this.addChild(this.view);
  }

  public setItem(item: Item) {
    if (this.item !== item) {
      this.item = item;
      this.updateView();
    }
  }

  private updateView() {
    this.view.text = `<name>${this.item.name}</name>
<type>${startCase(this.item.type)}</type>`;
  }

  layout() {
    const width = Math.max(100, this.view.contentWidth);
    const height = Math.max(50, this.view.contentHeight);
    this.view.position.set(16, 16);
    this.view.layout(width, height);
    super.layout(width + 32, height + 32);
  }
}