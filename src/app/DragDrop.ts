import { App } from 'app';
import { interaction, Container, DisplayObject, Point, RendererPlugins } from 'pixi.js';
import { first } from 'rxjs/operators/first';
import { Subject } from 'rxjs/Subject';

type InteractionEvent = interaction.InteractionEvent;

export class DragDrop {
  private interaction: interaction.InteractionManager;
  private readonly overlay = new Container();
  private readonly pointerPos = new Point();
  private dragOffset = new Point();
  private activeObj?: DisplayObject;
  private endDrag$ = new Subject<DisplayObject | null>();

  public get active() { return !!this.activeObj; }

  constructor(private readonly app: App) {
    this.interaction = (app.renderer.plugins as RendererPlugins).interaction;
    app.stage.addChild(this.overlay);
    this.interaction.on('pointermove', (e: InteractionEvent) =>
      e.data.getLocalPosition(this.overlay, this.pointerPos)
    );
    this.interaction.on('pointerup', this.end);
  }

  public begin(object: DisplayObject) {
    if (this.activeObj) {
      console.log('dragdrop: already in progress');
      this.overlay.removeChild(this.activeObj);
      this.endDrag$.next(null);
    }
    this.overlay.toLocal(new Point(0, 0), object, this.dragOffset);
    this.dragOffset.x -= this.pointerPos.x;
    this.dragOffset.y -= this.pointerPos.y;
    object.parent && object.parent.removeChild(object);
    this.overlay.addChild(object);
    this.activeObj = object;
    return this.endDrag$.pipe(first()).toPromise();
  }

  private end = (e: InteractionEvent) => {
    if (this.activeObj) {
      const pt = e.data.global.clone();
      pt.x += this.dragOffset.x;
      pt.y += this.dragOffset.y;
      const target = this.interaction.hitTest(pt, this.app.root);
      this.endDrag$.next(target);

      this.overlay.removeChild(this.activeObj);
      this.activeObj = undefined;
    }
    e.data.getLocalPosition(this.overlay, this.pointerPos);
  }

  public layout() {
    if (this.activeObj) {
      this.activeObj.position.set(
        this.pointerPos.x + this.dragOffset.x,
        this.pointerPos.y + this.dragOffset.y
      );
    }
  }
}