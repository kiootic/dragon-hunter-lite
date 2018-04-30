export interface EntityProps {
  readonly id: number;
  readonly type: string;
  readonly age: number;
  readonly traits: Record<string, any>;
}