import { Game } from 'app/game';
import { Command, CommandContext } from 'app/game/commands';
import { HUDElement } from 'app/game/hud';
import 'app/game/hud/console.css';
import { compact } from 'lodash';

const ConsoleHTML = `
<div class="console">
  <div class="con-log-box">
    <div class="con-log-scroll">
      <div class="con-log"></div>
    </div>
  </div>
  <div>
    <input class="con-input">
  </div>
</div>
`;

export class Console implements HUDElement, CommandContext {
  public readonly display = null;

  private readonly root = new DOMParser().parseFromString(ConsoleHTML, 'text/html').querySelector('.console') as HTMLElement;
  private readonly input = this.root.querySelector('.con-input') as HTMLInputElement;
  private readonly logBox = this.root.querySelector('.con-log') as HTMLDivElement;

  constructor(public readonly game: Game) {
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

  log(text: string) {
    const entry = document.createElement('li');
    entry.classList.add('con-log-entry');
    entry.innerText = text;
    this.logBox.appendChild(entry);
    entry.scrollIntoView();
  }

  private processInput(input: string) {
    if (!input) return;
    this.lastInput = input;

    if (!input.startsWith('/')) {
      this.log(input);
      return;
    }
    const [cmd, ...args] = compact(input.split(' ').map(part => part.trim()));
    const commandName = cmd.substr(1).toLowerCase();
    if (commandName === 'clear') {
      while (this.logBox.lastChild) {
        this.logBox.removeChild(this.logBox.lastChild);
      }
    } else if (Command.registry.has(commandName)) {
      Command.registry.get(commandName)!.run(this, args);
    } else {
      this.log('unknown command: ' + commandName);
    }
  }
}