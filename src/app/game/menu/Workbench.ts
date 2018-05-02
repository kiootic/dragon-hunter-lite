import { MenuPanel } from 'app/game/menu';
import { Texture } from 'pixi.js';

export class Workbench extends MenuPanel {
  readonly name = 'Workbench';
  readonly icon = Texture.fromFrame('sprites/ui/tab-workbench');

  layout(width: number, height: number): void {
  }
}