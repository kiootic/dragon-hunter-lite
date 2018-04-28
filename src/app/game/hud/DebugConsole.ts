import { Game } from 'app/game';
import { HUDElement } from 'app/game/hud';
import 'app/game/hud/debug.css';
import { Inventory } from 'app/game/traits';
import { Item } from 'common/data';
import { Wood } from 'data/items';
import { compact } from 'lodash';

const ConsoleHTML = `
<div class="debug-console">
  <div class="debug-log-box">
    <div class="debug-log"></div>
  </div>
  <input class="debug-input">
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
    if (event.key === 'F3' || (event.key === 'Escape' && this.root.classList.contains('active')))
      this.toggleInput();
    else if (event.key === 'Enter' && event.target === this.input) {
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
          case 'wood': item = Wood();
        }
        if (!item)
          this.addLog('unknown item: ' + args[0]);
        else {
          this.game.player.traits.get(Inventory).content[0] = item;
          this.addLog('given item ' + item.name);
        }
      } break;
      default:
        this.addLog('unknown command: ' + cmd[0]);
        break;
    }
  }
}