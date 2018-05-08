export interface Trait {
  readonly type: string;
}

export interface TraitType<T extends Trait = Trait, Arg = any> {
  readonly _mark: T;
  readonly Type: string;
  make(arg?: Arg): T;
  deserialize(data: any, trait: T): T;
  serialize(trait: T): any;
}

export namespace Trait {
  export const types = new Map<string, TraitType>();
}