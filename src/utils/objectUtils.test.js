import deepFreeze from 'deep-freeze';
import { removeProperty } from './objectUtils';

describe('removeProperty', () => {
  it('should return object without property, preserving other properties', () => {
    const obj = {
      a: 1,
      b: 2,
      c: 3
    };

    deepFreeze(obj);

    const result = removeProperty(obj, 'b');

    expect(result).toEqual({
      a: 1,
      c: 3
    });
  });

  it('should return equivalent object if property not present', () => {
    const obj = {
      a: 1
    };

    deepFreeze(obj);

    const result = removeProperty(obj, 'b');

    expect(result).toEqual(obj);
  });

  it('should return empty object if object has no properties', () => {
    const obj = {};

    deepFreeze(obj);

    const result = removeProperty(obj, 'a');

    expect(result).toEqual(obj);
  });

  it('should return empty object if sole property', () => {
    const obj = {
      a: 1
    };

    deepFreeze(obj);

    const result = removeProperty(obj, 'a');

    expect(result).toEqual({});
  });
});
