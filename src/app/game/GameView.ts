import { Container } from 'pixi.js';
import { Game } from 'app/game/Game';
import { Camera } from 'app/game/Camera';
import { Panel } from 'app/components/Panel';
import { MiniMapPanel } from 'app/game/map/MiniMapPanel';

export class GameView extends Container {
  public readonly camera = new Camera();
  public readonly minimap = new MiniMapPanel();

  constructor(public readonly game: Game) {
    super();
    this.addChild(this.camera);
    this.addChild(this.minimap);
  }

  private offsetX = 0;
  private offsetY = 0;

  public layout(width: number, height: number) {
    if (this.game.keyboard.isDown('a')) this.offsetX -= 100;
    if (this.game.keyboard.isDown('d')) this.offsetX += 100;
    if (this.game.keyboard.isDown('w')) this.offsetY -= 100;
    if (this.game.keyboard.isDown('s')) this.offsetY += 100;
    this.camera.x = 0;
    this.camera.y = 0;
    this.camera.layout(this.offsetX, this.offsetY, width, height);
    this.minimap.layout(width, height);
  }
}