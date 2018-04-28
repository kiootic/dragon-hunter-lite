export class Keyboard {
  private state = new Set<string>();
  private newKey = new Map<string, boolean>();

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
    if (event.repeat) return;
    this.state.add(event.key.toLowerCase());
    this.newKey.set(event.key.toLowerCase(), true);
  }

  private keyup(event: KeyboardEvent) {
    event.preventDefault();
    if (event.repeat) return;
    this.state.delete(event.key.toLowerCase());
    this.newKey.set(event.key.toLowerCase(), false);
  }

  private blur() {
    for (const key of this.state)
      this.newKey.set(key, false);
    this.state.clear();
  }

  public isDown(...keys: string[]) {
    return keys.some(key => this.newKey.get(key.toLowerCase()) === true);
  }

  public isUp(...keys: string[]) {
    return keys.some(key => this.newKey.get(key.toLowerCase()) === false);
  }

  public isPressed(...keys: string[]) {
    return keys.some(key => this.state.has(key.toLowerCase()));
  }

  public update() {
    this.newKey.clear();
  }

  public dispose() {
    this.elem.removeEventListener('keydown', this.keydown);
    this.elem.removeEventListener('keyup', this.keyup);
    this.elem.removeEventListener('blur', this.blur);
  }
}
