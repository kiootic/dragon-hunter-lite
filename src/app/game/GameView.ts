import { Container } from 'pixi.js';
import { Game } from 'app/game/Game';
import { Camera } from 'app/game/Camera';
import { Panel } from 'app/components';
import { MiniMapPanel } from 'app/game/map';

export class GameView extends Container {
  public readonly camera = new Camera();
  public readonly minimap = new MiniMapPanel();

  constructor(public readonly game: Game) {
    super();
    this.addChild(this.camera);
    this.addChild(this.minimap);
  }

  public offsetX = 0;
  public offsetY = 0;

  public layout(width: number, height: number) {
    this.camera.x = 0;
    this.camera.y = 0;
    this.camera.layout(this.offsetX, this.offsetY, width, height);
    this.minimap.layout(width, height);
  }
}