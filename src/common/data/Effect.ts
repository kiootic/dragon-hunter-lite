export interface Effect {
  readonly type: string;
  readonly name: string;
  readonly description: string;
  readonly power: number;
  readonly element?: string;
  duration: number;
}