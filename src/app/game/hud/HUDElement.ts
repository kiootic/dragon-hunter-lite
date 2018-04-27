import { LayoutView } from 'app/components';
import { Game } from 'app/game';

export interface HUDElement {
  display: LayoutView | null;
  update(dt: number): void;
  dispose?(): void;
}

export interface HUDElementType<T extends HUDElement = HUDElement> {
  new(game: Game): HUDElement;
}
