export interface Element {
  readonly tier: number;
  readonly name: string;
  readonly composition?: [string, string];
}