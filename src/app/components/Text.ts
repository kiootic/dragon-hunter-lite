import { Container, Text as PixiText, TextStyleOptions, Point } from 'pixi.js';
import { ScaleFactor } from 'app';

export class Text extends Container {
  private _text: PixiText;

  public set text(value: string) { this._text.text = value; }
  public get style() { return this._text.style; }

  constructor(text?: string, style?: TextStyleOptions) {
    super();
    this._text = new PixiText(text, {
      fontFamily: 'Unibody8Pro',
      fontSize: 8,
      fill: 'white',
      align: 'center',
      ...style
    });
    this._text.scale = new Point(ScaleFactor, ScaleFactor);
    this.addChild(this._text);
  }

  public layout(width: number, height: number) {
    switch (this._text.style.align) {
      case 'left':
        this._text.x = 0;
        break;
      case 'center':
        this._text.x = (width - this._text.width) / 2;
        break;
      case 'right':
        this._text.x = width - this._text.width;
        break;
    }
    this._text.y = (height - this._text.height) / 2;
  }
}
