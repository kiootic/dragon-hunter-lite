import { App } from 'app';
import { Panel } from 'app/components';
import { StyledText } from 'app/components/StyledText';
import { TextStyleSet } from 'pixi-multistyle-text';

export class TextToolTip extends Panel {
  private readonly textView: StyledText;

  constructor(app: App, text: string, styles: TextStyleSet, scale: number = 1) {
    super(app);
    this.textView = new StyledText(text, styles, scale);
    this.addChild(this.textView);
  }

  public set text(value: string) {
    this.textView.text = value;
  }

  layout() {
    const width = this.textView.contentWidth;
    const height = this.textView.contentHeight;
    this.textView.position.set(16, 16);
    this.textView.layout(width, height);
    super.layout(width + 32, height + 32);
  }
}