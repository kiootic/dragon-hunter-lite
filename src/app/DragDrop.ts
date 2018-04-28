import { App } from 'app';
import { interaction, Container, DisplayObject, Point } from 'pixi.js';
import { first } from 'rxjs/operators/first';
import { Subject } from 'rxjs/Subject';

type InteractionEvent = interaction.InteractionEvent;

export class DragDrop {
  private readonly overlay = new Container();
  private readonly pointerPos = new Point();
  private activeObj?: DisplayObject;
  private endDrag$ = new Subject<DisplayObject | null>();

  constructor(app: App) {
    app.stage.addChild(this.overlay);
    this.overlay.interactive = true;
    this.overlay.on('pointermove', (e: InteractionEvent) =>
      e.data.getLocalPosition(this.overlay, this.pointerPos)
    );
    this.overlay.on('pointerup', this.end);
    this.overlay.on('pointerupoutside', this.end);
  }

  public begin(object: DisplayObject) {
    if (this.activeObj) {
      console.log('dragdrop: already in progress');
      this.overlay.removeChild(this.activeObj);
      this.endDrag$.next(null);
    }
    object.parent && object.parent.removeChild(object);
    this.overlay.addChild(object);
    this.activeObj = object;
    return this.endDrag$.lift<DisplayObject>(first).toPromise();
  }

  private end = (e: InteractionEvent) => {
    if (this.activeObj) {
      this.endDrag$.next(null);

      this.overlay.removeChild(this.activeObj);
      this.activeObj = undefined;
    }
  }

  public layout() {
    if (this.activeObj) {
      this.activeObj.position.copy(this.pointerPos);
    }
  }
}