import { GameState } from 'app/states/GameState';
import { Container, Text, loaders } from 'pixi.js';
import { App } from 'app/App';
import { fadeOut } from 'app/utils/animations';

export class StateTitle extends GameState {
  public get name() { return 'title'; }

  constructor() {
    super();
  }
}