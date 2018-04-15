import { Container } from 'pixi.js';
import { Game } from 'app/game/Game';
import { Camera } from 'app/game/Camera';

export class GameView extends Container {
  public camera = new Camera();

  constructor(public readonly game: Game) {
    super();
    this.addChild(this.camera);
  }

  private offsetX = 0;
  private offsetY = 0;

  public layout(width: number, height: number) {
    if (this.game.keyboard.isDown('a')) this.offsetX-=10;
    if (this.game.keyboard.isDown('d')) this.offsetX+=10;
    if (this.game.keyboard.isDown('w')) this.offsetY-=10;
    if (this.game.keyboard.isDown('s')) this.offsetY+=10;
    this.camera.x = 0;
    this.camera.y = 0;
    this.camera.layout(this.offsetX, this.offsetY, width * 3 / 4, height);
  }
}