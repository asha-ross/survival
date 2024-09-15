// global.d.ts

interface ObjectConstructor {
  groupBy<T, K extends PropertyKey>(
    items: Iterable<T>,
    keySelector: (item: T) => K,
  ): Record<K, T[]>
}
