/**
 * Transforms a Map into an array of keys.
 */
export function mapKeysToArray<K, V>(m: Map<K, V>): K[] {
  return Array.from(m.keys());
}
