import { Container } from "pixi.js";
import { Game } from "app/game/Game";
import { Camera } from "app/game/Camera";

export class GameView extends Container {
  public camera = new Camera();
  
  constructor(public readonly game: Game) {
    super();
    this.addChild(this.camera);
  }

  public layout(width: number, height: number) {
    this.camera.x = 0;
    this.camera.y = 0;
    this.camera.layout(0, 0, width * 3 / 4, height);
  }
}