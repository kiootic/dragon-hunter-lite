export class Keyboard {
  private keys = new Map<string, boolean>();

  constructor(private readonly elem: HTMLElement) {
    this.keydown = this.keydown.bind(this);
    this.keyup = this.keyup.bind(this);
    this.blur = this.blur.bind(this);

    elem.tabIndex = 1;
    elem.addEventListener('keydown', this.keydown);
    elem.addEventListener('keyup', this.keyup);
    elem.addEventListener('blur', this.blur);
    setTimeout(() => elem.focus(), 0);
  }

  private keydown(event: KeyboardEvent) {
    event.preventDefault();
    this.keys.set(event.key, true);
  }

  private keyup(event: KeyboardEvent) {
    event.preventDefault();
    this.keys.set(event.key, false);
  }

  private blur() {
    this.keys.clear();
  }

  public isDown(...keys: string[]) {
    return keys.some(key => this.keys.has(key) ? this.keys.get(key)! : false);
  }

  public dispose() {
    this.elem.removeEventListener('keydown', this.keydown);
    this.elem.removeEventListener('keyup', this.keyup);
    this.elem.removeEventListener('blur', this.blur);
  }
}
