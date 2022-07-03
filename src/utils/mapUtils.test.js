import { mapKeysToArray } from './mapUtils';

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
