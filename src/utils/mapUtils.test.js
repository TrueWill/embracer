import deepFreeze from 'deep-freeze';
import { arrayToMap } from './mapUtils';

describe('arrayToMap', () => {
  it('should create map from 2D array', () => {
    const a = [['key1', 'value1'], ['key2', 'value2']];

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
