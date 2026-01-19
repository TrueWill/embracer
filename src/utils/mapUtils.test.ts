import deepFreeze from 'deep-freeze';
import { arrayToMap, mapKeysToArray } from './mapUtils';

describe('arrayToMap', () => {
  it('should create map from 2D array', () => {
    const a = [
      ['key1', 'value1'],
      ['key2', 'value2']
    ];

    deepFreeze(a);

    const result = arrayToMap(a);

    expect(result.size).toBe(2);
    expect(result.get('key1')).toBe('value1');
    expect(result.get('key2')).toBe('value2');
  });

  it('should create empty map from empty array', () => {
    const result = arrayToMap([]);

    expect(result.size).toBe(0);
  });
});

describe('mapKeysToArray', () => {
  it('should create array from map keys in order', () => {
    const map = new Map();
    map.set('a', 'value1');
    map.set('c', 'value2');
    map.set('1', 'value3');
    map.set('b', 'value4');
    map.set('2', 'value5');

    const result = mapKeysToArray(map);

    expect(result).toEqual(['a', 'c', '1', 'b', '2']);
  });

  it('should create empty array from new map', () => {
    const map = new Map();

    const result = mapKeysToArray(map);

    expect(result).toEqual([]);
  });
});
