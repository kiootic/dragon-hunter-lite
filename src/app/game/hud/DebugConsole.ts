import { Game } from 'app/game';
import { ItemDrop } from 'app/game/entities';
import { HUDElement } from 'app/game/hud';
import 'app/game/hud/debug.css';
import { Spatial } from 'app/game/traits';
import { Item } from 'common/data';
import { Bone, Wood } from 'data/items';
import { compact } from 'lodash';

const ConsoleHTML = `
<div class="debug-console">
  <div class="debug-log-box">
    <div class="debug-log"></div>
  </div>
  <div>
    <input class="debug-input">
  </div>
</div>
`;

export class DebugConsole implements HUDElement {
  public readonly display = null;

  private readonly root = new DOMParser().parseFromString(ConsoleHTML, 'text/html').querySelector('.debug-console')!;
  private readonly input = this.root.querySelector('.debug-input') as HTMLInputElement;
  private readonly log = this.root.querySelector('.debug-log') as HTMLDivElement;

  constructor(private readonly game: Game) {
    document.body.appendChild(this.root);
    document.body.addEventListener('keydown', this.onKeyDown);
  }

  private onKeyDown = (event: KeyboardEvent) => {
    const isActive = this.root.classList.contains('active');
    if (isActive && event.key === 'Escape') {
      this.toggleInput();
    } else if (event.key.toLowerCase() === 't' || event.key === '/') {
      if (isActive)
        this.input.focus();
      else
        this.toggleInput();
      if (event.key === '/' && event.target !== this.input)
        this.input.value = '/';
    } else if (event.key === 'Enter' && event.target === this.input) {
      this.processInput(this.input.value);
      this.input.value = '';
    }
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
    while (this.log.childNodes.length > 20)
      this.log.removeChild(this.log.firstChild!);
  }

  private processInput(input: string) {
    if (!input) return;
    if (!input.startsWith('/')) {
      this.addLog(input);
      return;
    }
    const [cmd, ...args] = compact(input.split(' ').map(part => part.trim()));
    switch (cmd) {
      case '/give': {
        let item: Item | undefined;
        switch (args[0]) {
          case 'wood': item = Wood(); break;
          case 'bone': item = Bone(); break;
        }
        if (!item)
          this.addLog('unknown item: ' + args[0]);
        else {
          const itemDrop = ItemDrop.make(this.game, item, this.game.player.traits.get(Spatial).position);
          this.game.entities.add(itemDrop);
          this.addLog('given item ' + item.name);
        }
      } break;
      default:
        this.addLog('unknown command: ' + cmd[0]);
        break;
    }
  }
}