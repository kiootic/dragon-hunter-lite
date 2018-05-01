import { UIScaleFactor } from 'app';
import { LayoutView } from 'app/components';
import MultiStyleText, { ExtendedTextStyle, TextStyleSet } from 'pixi-multistyle-text';
import { Container, Point } from 'pixi.js';

export class StyledText extends Container implements LayoutView {
  private _text: MultiStyleText;

  public set text(value: string) { this._text.text = value; }
  public get style() { return this._text.style; }
  public get contentWidth() { return this._text.width; }
  public get contentHeight() { return this._text.height; }

  constructor(text: string, styles: TextStyleSet, scale: number = 1) {
    super();
    const defaultStyle = {
      fontFamily: 'Unibody8Pro',
      fontSize: 8,
      fill: 'white',
      align: 'center',
      ...(styles.default || {})
    } as ExtendedTextStyle;

    this._text = new MultiStyleText(text, { ...styles, default: defaultStyle });
    this.addChild(this._text);

    this._text.scale = new Point(scale * UIScaleFactor, scale * UIScaleFactor);
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
