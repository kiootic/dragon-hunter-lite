import { Game } from 'app/game';
import { ItemDrop } from 'app/game/entities';
import { HUDElement } from 'app/game/hud';
import 'app/game/hud/debug.css';
import { InventoryUpdated } from 'app/game/messages';
import { Inventory, PlayerData, Stats } from 'app/game/traits';
import { instantiate, randomValue, RandomValue } from 'common/random';
import { compact, padStart } from 'lodash';

const ConsoleHTML = `
<div class="debug-console">
  <div class="debug-log-box">
    <div class="debug-log-scroll">
      <div class="debug-log"></div>
    </div>
  </div>
  <div>
    <input class="debug-input">
  </div>
</div>
`;

export class DebugConsole implements HUDElement {
  public readonly display = null;

  private readonly root = new DOMParser().parseFromString(ConsoleHTML, 'text/html').querySelector('.debug-console') as HTMLElement;
  private readonly input = this.root.querySelector('.debug-input') as HTMLInputElement;
  private readonly log = this.root.querySelector('.debug-log') as HTMLDivElement;

  constructor(private readonly game: Game) {
    document.body.appendChild(this.root);
    this.root.addEventListener('keydown', this.onKeyDown);
    this.game.app.view.addEventListener('keydown', this.onKeyDown);
  }

  private lastInput = '';

  private onKeyDown = (event: KeyboardEvent) => {
    const isActive = this.root.classList.contains('active');
    if (isActive && event.key === 'Escape') {
      this.toggleInput();
    } else if (isActive && event.key === 'ArrowUp' && event.target === this.input) {
      this.input.value = this.lastInput;
      this.input.setSelectionRange(this.input.value.length, this.input.value.length);
      event.preventDefault();
    } else if (event.key.toLowerCase() === 't' || event.key === '/') {
      if (isActive)
        this.input.focus();
      else if (document.activeElement === this.game.app.view)
        this.toggleInput();

      if (event.key === '/' && event.target !== this.input)
        this.input.value = '/';
    } else if (event.key === 'Enter' && event.target === this.input) {
      this.processInput(this.input.value);
      this.input.value = '';
    }
    if (event.target !== this.input)
      event.preventDefault();
  }

  update() {
  }

  dispose() {
    this.root.remove();
    document.body.removeEventListener('keydown', this.onKeyDown);
  }

  toggleInput() {
    if (this.root.classList.toggle('active'))
      this.input.focus();
    else
      this.game.app.view.focus();
  }

  addLog(text: string) {
    const entry = document.createElement('li');
    entry.classList.add('debug-log-entry');
    entry.innerText = text;
    this.log.appendChild(entry);
    entry.scrollIntoView();
  }

  private processInput(input: string) {
    if (!input) return;
    this.lastInput = input;

    if (!input.startsWith('/')) {
      this.addLog(input);
      return;
    }
    const [cmd, ...args] = compact(input.split(' ').map(part => part.trim()));
    switch (cmd) {
      case '/clear': {
        while (this.log.lastChild)
          this.log.removeChild(this.log.lastChild);
      } break;
      case '/clear-inv': {
        const { slots } = this.game.player.traits(Inventory);
        for (const slot of slots) {
          slot.item = null;
          this.game.dispatch(new InventoryUpdated(slot));
        }
      } break;
      case '/drops': {
        for (const obj of this.game.library.objects.filter(obj => obj && obj.drops)) {
          for (const { item } of obj.drops!.table.items) {
            const drop = ItemDrop.make(this.game, instantiate(item));
            this.game.entities.add(drop);
          }
        }
      } break;
      case '/give': {
        const id = args[0];
        for (const obj of this.game.library.objects.filter(obj => obj && obj.drops)) {
          for (const { item: template } of obj.drops!.table.items) {
            const item = instantiate(template);
            if (item.id !== id) continue;
            const drop = ItemDrop.make(this.game, item);
            this.game.entities.add(drop);
          }
        }
      } break;
      case '/dupe': {
        const { hotbarSelection: sel } = this.game.player.traits(PlayerData);
        const { slots } = this.game.player.traits(Inventory);
        const item = slots[sel].item;
        if (item) {
          const drop = ItemDrop.make(this.game, item);
          this.game.entities.add(drop);
        }
      } break;
      case '/speed': {
        const boost = Number(args[0]) || 0;
        this.game.player.traits(Stats).bonus.spd = boost;
      } break;
      case '/elements': {
        const valueOf = (value: RandomValue) => padStart(randomValue(value).toFixed(2), 5, ' ');
        this.addLog('|   name   |    fission   |    fusion    | color |');
        for (const name of Object.keys(this.game.library.elements)) {
          const elem = this.game.library.elements[name];
          this.addLog(` \
${padStart(name, 10, ' ')}\
 (${valueOf(elem.fissionThreshold)}, ${valueOf(elem.fissionRate)})\
 (${valueOf(elem.fusionThreshold)}, ${valueOf(elem.fusionRate)})\
 ${padStart(elem.color, 6, '0')}`);
        }
      } break;
      default:
        this.addLog('unknown command: ' + cmd);
        break;
    }
  }
}