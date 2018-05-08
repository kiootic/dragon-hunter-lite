import { App } from 'app';
import { Panel } from 'app/components';
import { interaction, Container, DisplayObject, Point, RendererPlugins } from 'pixi.js';

type InteractionEvent = interaction.InteractionEvent;

const ToolTipOffset = 8;

export class ToolTip {
  private interaction: interaction.InteractionManager;
  private readonly overlay = new Container();
  private readonly pointerPos = new Point();
  private readonly global = new Point();
  private panel?: Panel;
  private target?: DisplayObject;

  public get active() { return !!this.panel; }

  constructor(private readonly app: App) {
    this.interaction = (app.renderer.plugins as RendererPlugins).interaction;
    app.stage.addChild(this.overlay);
    this.interaction.on('pointermove', (e: InteractionEvent) => {
      if (e.data.originalEvent.target !== app.view) {
        if (this.panel) this.hide(this.panel);
        return;
      }

      e.data.getLocalPosition(this.overlay, this.pointerPos);
      this.global.copy(e.data.global);
    });
  }

  public add(target: DisplayObject, show: () => Panel | null) {
    const showToolTip = (e: interaction.InteractionEvent) => {
      if (e.data.originalEvent.target !== this.app.view)
        return;

      if (e.target === target && !this.app.dragDrop.active) {
        const panel = show();
        if (panel)
          this.show(panel, target);
      }
    };
    target.on('pointerover', showToolTip);
    target.on('pointermove', showToolTip);
  }

  public show(panel: Panel, target: DisplayObject) {
    if (this.panel) this.hide(this.panel);

    this.overlay.addChild(panel);
    this.panel = panel;
    this.target = target;
  }

  public hide(panel: Panel) {
    if (this.panel === panel) {
      this.overlay.removeChild(panel);
      this.panel = undefined;
      this.target = undefined;
    }
  }

  public update() {
    if (!this.panel) return;
    const target = this.interaction.hitTest(this.global, this.app.root);
    if (target !== this.target) {
      this.hide(this.panel);
    }
  }

  public layout() {
    if (this.panel) {
      const { width, height } = this.app.screen;
      this.panel.layout(width, height);
      const { width: panelWidth, height: panelHeight } = this.panel;

      let x = this.pointerPos.x + ToolTipOffset, y = this.pointerPos.y + ToolTipOffset;
      if (x + panelWidth >= width) x = this.pointerPos.x - ToolTipOffset - panelWidth;
      if (y + panelHeight >= height) y = this.pointerPos.y - ToolTipOffset - panelHeight;
      this.panel.position.set(x, y);
    }
  }
}