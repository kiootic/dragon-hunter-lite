import { SlotView, TextButton } from 'app/components';
import { StyledText } from 'app/components/StyledText';
import { Game } from 'app/game';
import { GameOverlay } from 'app/game/overlays';
import { Inventory, Stats, StatList } from 'app/game/traits';
import * as vex from 'vex-js';

const MenuWidth = 800;
const MenuHeight = 600;
const SlotsPerRow = 8;

export class MenuOverlay extends GameOverlay {
  private readonly saveButton = new TextButton('save');
  private readonly exitButton = new TextButton('exit');

  private readonly slotViews: SlotView[] = [];
  private readonly trash = new SlotView(this.game, { item: null, accepts: null });

  private readonly stats: StatList;
  private readonly base: StatList;
  private readonly statNames = new StyledText('', {
    default: { align: 'right', fontWeight: 'bold' },
    s: { fontSize: 12 }
  });
  private readonly statValues = new StyledText('', {
    default: { align: 'left' },
    s: { fontSize: 12 },
    incr: { fill: '#d0d000' },
    decr: { fill: '#d00000' }
  });

  constructor(game: Game) {
    super(game);

    const slots = game.player.traits.get(Inventory).slots;
    for (const slot of slots) {
      const view = new SlotView(this.game, slot);
      this.slotViews.push(view);
      this.content.addChild(view);
    }
    this.slotViews[40].overlay.setTexture('sprites/ui/inv-slot-chestplates');
    this.slotViews[41].overlay.setTexture('sprites/ui/inv-slot-leggings');
    this.slotViews[42].overlay.setTexture('sprites/ui/inv-slot-boots');

    this.content.addChild(this.trash);
    this.trash.overlay.setTexture('sprites/ui/inv-slot-trash');

    const stats = this.game.player.traits(Stats);
    this.stats = Stats.compute(stats);
    this.base = stats.base;
    this.content.addChild(this.statNames);
    this.content.addChild(this.statValues);

    this.content.addChild(this.saveButton);
    this.content.addChild(this.exitButton);
    this.saveButton.on(TextButton.Clicked, this.save.bind(this));
    this.exitButton.on(TextButton.Clicked, this.exit.bind(this));
  }

  layout(width: number, height: number) {
    this.position.set(
      Math.round((width - MenuWidth) / 2),
      Math.round((height - MenuHeight) / 2)
    );
    super.layout(MenuWidth, MenuHeight);

    const slotLeft = 24, slotTop = 24;
    let x = 0, y = 0;
    for (const view of this.slotViews.slice(-3)) {
      view.position.set(slotLeft + (x + SlotsPerRow) * SlotView.Size + 16, slotTop);
      view.layout();
      x++;
    }
    this.trash.position.set(slotLeft + (SlotsPerRow + 4) * SlotView.Size + 16, slotTop);
    this.trash.layout();

    x = y = 0;
    for (const view of this.slotViews.slice(0, -3)) {
      view.position.set(slotLeft + x * SlotView.Size, slotTop + y * SlotView.Size + (y > 0 ? 16 : 0));
      view.layout();
      if (++x === SlotsPerRow) {
        x = 0;
        y++;
      }
    }

    this.statNames.position.set(
      slotLeft + SlotsPerRow * SlotView.Size + 16,
      slotTop + SlotView.Size + 16
    );
    this.statNames.layout(this.statNames.contentWidth, this.statNames.contentHeight);
    this.statValues.position.set(
      slotLeft + SlotsPerRow * SlotView.Size + 16 + this.statNames.contentWidth,
      slotTop + SlotView.Size + 16
    );
    this.statValues.layout(this.statValues.contentWidth, this.statValues.contentHeight);

    this.saveButton.position.set(24, 384);
    this.saveButton.layout(96, 48);
    this.exitButton.position.set(this.saveButton.x + 16 + 96, 384);
    this.exitButton.layout(96, 48);
  }

  update(dt: number) {
    if (this.game.keyboard.isDown('Escape')) this.done();

    for (const view of this.slotViews)
      view.update(dt);

    this.trash.slot.item = null;
    this.trash.update(dt);

    this.updateStats();
  }

  private updateStats() {
    function makeBonusText(base: number, computed: number) {
      const diff = computed - base;
      if (diff < 0) return `(<decr>${computed - base}</decr>)`;
      else if (diff > 0) return `(<incr>+${computed - base}</incr>)`;
      else return '';
    }

    this.statNames.text = `
hp<s> </s>
str<s> </s>
def<s> </s>
spd<s> </s>
vit<s> </s>
`.trim();
    this.statValues.text = `
<s> </s>${this.stats.hp} / ${this.stats.maxHp} ${makeBonusText(this.base.maxHp, this.stats.maxHp)}
<s> </s>${this.stats.str} ${makeBonusText(this.base.str, this.stats.str)}
<s> </s>${this.stats.def} ${makeBonusText(this.base.def, this.stats.def)}
<s> </s>${this.stats.spd} ${makeBonusText(this.base.spd, this.stats.spd)}
<s> </s>${this.stats.vit} ${makeBonusText(this.base.vit, this.stats.vit)}
`.trim();
  }

  private save() {
    this.game.save();
    vex.dialog.prompt({
      label: 'Save name (max 8 char.): ',
      value: this.game.data.id,
      callback: (name) => {
        if (name === false) {
          this.game.app.view.focus();
          return;
        }

        if (!name) {
          vex.dialog.alert({ content: 'Name is empty!', callback: () => this.game.app.view.focus() });
          return;
        } else if (name.length > 8) {
          vex.dialog.alert({ content: 'Name is too long!', callback: () => this.game.app.view.focus() });
          return;
        }
        this.game.data.id = name;
        localStorage[name] = this.game.data.export();
        vex.dialog.alert({ content: `Saved as name '${name}'.`, callback: () => this.game.app.view.focus() });
      }
    });
  }

  private async exit() {
    await this.done();
    await this.game.app.popState();
  }

  async done() {
    this.game.app.dragDrop.cancel();
    await super.done();
  }
}