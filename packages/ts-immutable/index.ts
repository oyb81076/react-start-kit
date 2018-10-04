import { fromJS, Iterable, List, Map, OrderedMap, OrderedSet, Seq } from "immutable";
type RecordBasic<T> = T extends (
  string | number | boolean | Date | null | undefined | Iterable<any, any>
) ? T : IMapRecord<T>;
type RecordValue<T> = T extends any[] ? List<RecordBasic<T[number]>> : RecordBasic<T>;
export interface IMapRecord<T> {
  readonly size: number;
  get<K extends keyof T, V = RecordValue<T[K]>>(key: K, notSetValue?: V): V;
  set<K extends keyof T, V = RecordValue<T[K]>>(key: K, value: V): this;
  delete<K extends keyof T>(key: K): this;
  clear(): this;
  update(updater: (value: this) => this): this;
  update<K extends keyof T, V = RecordValue<T[K]>>(key: K, updater: (value: V) => V): this;
  update<K extends keyof T, V = RecordValue<T[K]>>(key: K, notSetValue: V, updater: (value: V) => V): this;
  merge<K extends keyof T, V = RecordValue<T[K]>>(...iterables: Array<Iterable<K, V>>): this;
  merge(...iterables: Array<Partial<T>>): this;
  mergeWith<K extends keyof T, V = RecordValue<T[K]>>(
    merger: (previous?: V, next?: V, key?: K) => V,
    ...iterables: Array<Iterable<K, V>>): this;
  mergeWith<K extends keyof T, V = RecordValue<T[K]>>(
    merger: (previous?: V, next?: T[K], key?: K) => V,
    ...iterables: T[]): this;
  mergeDeep<K extends keyof T, V = RecordValue<T[K]>>(...iterables: Array<Iterable<K, V>>): this;
  mergeDeep(...iterables: T[]): this;
  mergeDeepWith<K extends keyof T, V = RecordValue<T[K]>>(
    merger: (previous?: V, next?: V, key?: K) => V,
    ...iterables: Array<Iterable<K, V>>): this;
  mergeDeepWith<K extends keyof T, V = RecordValue<T[K]>>(
    merger: (previous?: V, next?: T[K], key?: K) => V,
    ...iterables: T[]): this;
  setIn(keyPath: any[] | Iterable<any, any>, value: any): this;
  deleteIn(keyPath: any[] | Iterable<any, any>): this;
  removeIn(keyPath: any[] | Iterable<any, any>): this;
  mergeIn(keyPath: any[] | Iterable<any, any>, ...iterables: Array<Iterable<any, any> | any>): this;
  mergeDeepIn(keyPath: any[] | Iterable<any, any>, ...iterables: Array<Iterable<any, any> | any>): this;
  withMutations(mutator: (mutable: this) => any): this;
  asMutable(): this;
  asImmutable(): this;
  toJS(): T;
  equals(t: any): boolean;
  has<K extends keyof T>(key: K): boolean;
  includes<V = RecordValue<T[keyof T]>>(value: V): boolean;
  contains<V = RecordValue<T[keyof T]>>(value: V): boolean;
  first(): RecordValue<T[keyof T]>;
  last(): RecordValue<T[keyof T]>;
  getIn<
    K1 extends keyof T,
    V = RecordValue<T[K1]>
    >(searchKeyPath: [K1], notSetValue?: V): V;
  getIn<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    V = RecordValue<T[K1][K2]>
    >(searchKeyPath: [K1, K2], notSetValue?: V): V;
  getIn<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    V = RecordValue<T[K1][K2][K3]>
    >(searchKeyPath: [K1, K2, K3], notSetValue?: V): V;
  getIn<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3],
    V = RecordValue<T[K1][K2][K3][K4]>
    >(searchKeyPath: [K1, K2, K3, K4], notSetValue?: V): V;
  getIn<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3],
    K5 extends keyof T[K1][K2][K3][K4],
    V = RecordValue<T[K1][K2][K3][K4][K5]>
    >(searchKeyPath: [K1, K2, K3, K4, K5], notSetValue?: V): V;
  getIn<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3],
    K5 extends keyof T[K1][K2][K3][K4],
    K6 extends keyof T[K1][K2][K3][K4][K5],
    V = RecordValue<T[K1][K2][K3][K4][K5][K6]>
    >(searchKeyPath: [K1, K2, K3, K4, K5, K6], notSetValue?: V): V;
  getIn<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3],
    K5 extends keyof T[K1][K2][K3][K4],
    K6 extends keyof T[K1][K2][K3][K4][K5],
    K7 extends keyof T[K1][K2][K3][K4][K5][K6],
    V = RecordValue<T[K1][K2][K3][K4][K5][K6][K7]>
    >(searchKeyPath: [K1, K2, K3, K4, K5, K6, K7], notSetValue?: V): V;
  getIn<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3],
    K5 extends keyof T[K1][K2][K3][K4],
    K6 extends keyof T[K1][K2][K3][K4][K5],
    K7 extends keyof T[K1][K2][K3][K4][K5][K6],
    K8 extends keyof T[K1][K2][K3][K4][K5][K6][K7],
    V = RecordValue<T[K1][K2][K3][K4][K5][K6][K7][K8]>
    >(searchKeyPath: [K1, K2, K3, K4, K5, K6, K7, K8], notSetValue?: V): V;
  getIn<V>(searchKeyPath: Iterable<any, any>, notSetValue?: V): V;
  updateIn<
    K1 extends keyof T,
    V = RecordValue<T[K1]>
    >(keyPath: [K1], updater: (value: V) => V): V;
  updateIn<
    K1 extends keyof T,
    V = RecordValue<T[K1]>
    >(keyPath: [K1], notSetValue: V, updater: (value: V) => V): V;
  updateIn<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    V = RecordValue<T[K1][K2]>
    >(keyPath: [K1, K2], updater: (value: V) => V): V;
  updateIn<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    V = RecordValue<T[K1][K2]>
    >(keyPath: [K1, K2], notSetValue: V, updater: (value: V) => V): V;
  updateIn<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    V = RecordValue<T[K1][K2][K3]>
    >(keyPath: [K1, K2, K3], updater: (value: V) => V): V;
  updateIn<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    V = RecordValue<T[K1][K2][K3]>
    >(keyPath: [K1, K2, K3], notSetValue: V, updater: (value: V) => V): V;
  updateIn<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3],
    V = RecordValue<T[K1][K2][K3][K4]>
    >(keyPath: [K1, K2, K3, K4], updater: (value: V) => V): V;
  updateIn<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3],
    V = RecordValue<T[K1][K2][K3][K4]>
    >(keyPath: [K1, K2, K3, K4], notSetValue: V, updater: (value: V) => V): V;
  updateIn<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3],
    K5 extends keyof T[K1][K2][K3][K4],
    V = RecordValue<T[K1][K2][K3][K4][K5]>
    >(keyPath: [K1, K2, K3, K4, K5], updater: (value: V) => V): V;
  updateIn<
    K1 extends keyof T,
    K2 extends keyof T[K1],
    K3 extends keyof T[K1][K2],
    K4 extends keyof T[K1][K2][K3],
    K5 extends keyof T[K1][K2][K3][K4],
    V = RecordValue<T[K1][K2][K3][K4][K5]>
    >(keyPath: [K1, K2, K3, K4, K5], notSetValue: V, updater: (value: V) => V): V;

  updateIn(keyPath: Iterable<any, any>, updater: (value: any) => any): this;
  updateIn(keyPath: Iterable<any, any>, notSetValue: any, updater: (value: any) => any): this;
  hasIn(searchKeyPath: any[] | Iterable<any, any>): boolean;
  toArray(): Array<RecordValue<T[keyof T]>>;
  toObject(): { [K in keyof T]: RecordValue<T[K]> };
  toMap<K extends keyof T, V = RecordValue<T[K]>>(): Map<K, V>;
  toOrderedMap<K extends keyof T, V = RecordValue<T[K]>>(): OrderedMap<K, V>;
  toSet(): Set<RecordValue<T[keyof T]>>;
  toSeq<K extends keyof T, V = RecordValue<T[K]>>(): Seq<K, V>;
  toOrderedSet(): OrderedSet<RecordValue<T[keyof T]>>;
  toList(): List<RecordValue<T[keyof T]>>;
  keys(): keyof T;
  map<M, K extends keyof T, V = RecordValue<T[K]>>(
    mapper: (value?: V, key?: K, iter?: this) => M,
    context?: any,
  ): this;
  values(): Iterator<RecordValue<T[keyof T]>>;
  entries<K extends keyof T, V = RecordValue<T[K]>>(): Iterator<[K, V]>;
  isEmpty(): boolean;
  count(): number;
}
export const fromObject = <T extends object>(obj: T): IMapRecord<T> => fromJS(obj);
