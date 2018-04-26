export interface Trait {
  readonly type: string;
}

export interface TraitType<T extends Trait = Trait> {
  readonly _mark: T;
  readonly Type: string;
  make(): T;
  deserialize(data: any): T;
  serialize(trait: T): any;
}

export namespace Trait {
  export const types = new Map<string, TraitType>();
}