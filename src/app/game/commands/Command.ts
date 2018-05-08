import { CommandContext } from 'app/game/commands';

export abstract class Command {
  static readonly registry = new Map<string, Command>();
  static register(command: Command) {
    this.registry.set(command.name, command);
  }

  abstract get name(): string;

  private context?: CommandContext;
  protected get game() { return this.context!.game; }
  protected log(text: string) { return this.context!.log(text); }

  run(context: CommandContext, args: string[]) {
    this.context = context;
    this.exec(...args);
    this.context = undefined;
  }
  abstract exec(...args: string[]): void;
}