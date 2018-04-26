export interface EntityProps {
  readonly id: number;
  readonly type: string;
  readonly traits: Record<string, any>;
}