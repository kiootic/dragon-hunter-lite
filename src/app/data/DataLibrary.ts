import { Terrain } from 'app/data/Terrain';

const terrains = require('./terrains.json');

export class DataLibrary {
  public readonly terrains: Terrain[] = require('./terrains.json');
}