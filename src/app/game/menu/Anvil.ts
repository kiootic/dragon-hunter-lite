import { Button, SlotView } from 'app/components';
import { TextToolTip } from 'app/components/TextToolTip';
import { Game } from 'app/game';
import { ItemDrop } from 'app/game/entities';
import { MenuPanel } from 'app/game/menu';
import { times } from 'lodash';
import { Sprite, Texture } from 'pixi.js';

interface AnvilTarget {
  id: string;
  name: string;
  description: string;
  slots: ({
    accepts: string,
    textures: string[]
  } | null)[];
}

function slot(...accepts: string[]) {
  return { accepts: `^(${accepts.join('|')})$`, textures: accepts };
}

const Targets: AnvilTarget[] = [{
  id: 'chestplate',
  name: 'Chestplate',
  description: '',
  slots: [
    slot('skin', 'scale'), null, slot('skin', 'scale'),
    null, slot('skin'), null,
    null, slot('skin', 'scale'), null,
  ]
}, {
  id: 'leggings',
  name: 'Leggings',
  description: '',
  slots: [
    null, null, null,
    null, slot('skin'), null,
    slot('skin', 'scale'), null, slot('skin', 'scale'),
  ]
}, {
  id: 'boots',
  name: 'Boots',
  description: '',
  slots: [
    null, null, null,
    null, null, null,
    slot('skin'), null, slot('skin'),
  ]
}, {
  id: 'sword',
  name: 'Sword',
  description: `
average damage
average range
average speed
`,
  slots: [
    slot('fang', 'scale'), null, null,
    null, slot('fang', 'scale'), null,
    null, null, slot('fang', 'bone'),
  ]
}, {
  id: 'spear',
  name: 'Spear',
  description: `
high damage
average range
low speed
`,
  slots: [
    slot('fang', 'scale'), null, null,
    null, slot('bone'), null,
    null, null, slot('bone'),
  ]
}, {
  id: 'bow',
  name: 'Bow',
  description: `
low damage
high range
high speed
`,
  slots: [
    null, slot('bone'), slot('bone'),
    slot('bone'), null, slot('skin'),
    slot('bone'), slot('skin'), null,
  ]
}, {
  id: 'arrow',
  name: 'Arrow',
  description: 'ammo of bow',
  slots: [
    slot('fang', 'scale'), null, null,
    null, slot('bone'), null,
    null, null, slot('scale'),
  ]
}];

export class Anvil extends MenuPanel {
  readonly name = 'Anvil';
  readonly icon = Texture.fromFrame('sprites/ui/tab-anvil');

  readonly toolTip: TextToolTip;

  readonly inSlots: SlotView[];
  readonly outSlot: SlotView;
  readonly arrow = new Sprite(Texture.fromFrame('sprites/ui/arrow'));

  activeTarget = Targets[0];
  readonly targetButtons: (Button & { target: AnvilTarget })[] = [];

  constructor(private readonly game: Game) {
    super();
    this.toolTip = new TextToolTip(game.app, '', {
      default: { align: 'left' },
      desc: { fill: '#d0d0d0' }
    });

    this.inSlots = times(9, () => new SlotView(game, { accepts: [], item: null }));
    for (const input of this.inSlots) {
      input.bgOverlay.outline = true;
      this.addChild(input);
    }
    this.outSlot = new SlotView(game, { accepts: [], item: null });
    this.addChild(this.outSlot);

    this.arrow.scale.set(2, 2);
    this.arrow.rotation = Math.PI;
    this.arrow.pivot.set(16, 16);
    this.arrow.position.set(SlotView.Size * 3 + 112, 64 + SlotView.Size + 24);
    this.addChild(this.arrow);

    let x = 32;
    for (const target of Targets) {
      const button = Object.assign(new Button(), { target });

      const icon = new Sprite(Texture.fromFrame(`sprites/ui/inv-slot-${target.id}`));
      icon.scale.set(2, 2);
      icon.alpha = 0.5;
      button.content.addChild(icon);

      button.position.set(x, 0);
      this.addChild(button);
      game.app.toolTip.add(button, () => {
        this.toolTip.text = `
${target.name}
<desc>${target.description}</desc>
`.trim();
        return this.toolTip;
      });
      button.on(Button.Clicked, () => this.updateTarget(target));

      this.targetButtons.push(button);
      x += 64;
    }
    this.updateTarget();
  }

  private updateTarget(target = this.activeTarget) {
    for (const { slot } of this.inSlots) {
      if (slot.item)
        this.game.entities.add(ItemDrop.make(this.game, slot.item));
    }

    for (let i = 0; i < 9; i++) {
      this.inSlots[i].slot.item = null;
      const targetSlot = target.slots[i];
      if (!targetSlot) {
        this.inSlots[i].enabled = false;
        this.inSlots[i].visible = false;
      } else {
        this.inSlots[i].enabled = true;
        this.inSlots[i].visible = true;
        this.inSlots[i].slot.accepts = targetSlot.accepts;
      }
    }

    this.activeTarget = target;
  }

  layout(width: number, height: number) {
    const anvilX = 64, anvilY = 64;
    let x = 0, y = 0;
    for (const input of this.inSlots) {
      input.position.set(anvilX + x * SlotView.Size, anvilY + y * SlotView.Size);
      input.layout();
      if (++x === 3) {
        x = 0; y++;
      }
    }

    this.outSlot.position.set(SlotView.Size * 3 + 164, anvilY + SlotView.Size);
    this.outSlot.layout();

    for (const button of this.targetButtons) {
      button.isEnabled = this.activeTarget !== button.target;
      button.layout(50, 50);
    }
  }

  elapsed = 0;
  update(dt: number) {
    this.elapsed += dt;
    const tick = Math.floor(this.elapsed / 1000);
    for (let i = 0; i < 9; i++) {
      const slot = this.activeTarget.slots[i];
      if (!slot) continue;
      if (this.inSlots[i].slot.item)
        this.inSlots[i].bgOverlay.clearTexture();
      else
        this.inSlots[i].bgOverlay.setTexture(`sprites/items/${slot.textures[tick % slot.textures.length]}`);
    }
  }

  dispose() {
    this.updateTarget();
  }
}