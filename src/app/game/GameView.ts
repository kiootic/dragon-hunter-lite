import { Camera } from 'app/game/Camera';
import { Game } from 'app/game/Game';
import { MiniMapPanel } from 'app/game/map';
import { Container } from 'pixi.js';

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
    this.camera.layout(width, height);
    this.minimap.layout(width, height);
  }
}