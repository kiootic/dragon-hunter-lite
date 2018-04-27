import { Button } from 'app/components/Button';
import { Text } from 'app/components/Text';
import { TextStyleOptions } from 'pixi.js';

export class TextButton extends Button {
  private readonly text: Text;

  constructor(text?: string, style?: TextStyleOptions & { scale?: number }) {
    super();
    this.text = new Text(text, style);
    this.content.addChild(this.text);
  }

  public layout(width: number, height: number) {
    super.layout(width, height);
    this.text.x = 0;
    this.text.y = 0;
    this.text.layout(this.contentWidth, this.contentHeight);
  }
}