// TODO: Inline
export const arrayToMap: (a: any) => Map<unknown, unknown> = a => new Map(a);

/**
 * Transforms a Map into an array of keys.
 */
export function mapKeysToArray<K, V>(m: Map<K, V>): K[] {
  return Array.from(m.keys());
}
