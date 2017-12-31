import { capitalizeFirstLetter } from './stringUtils';

describe('capitalizeFirstLetter', () => {
  it('should capitalize first letter leaving rest unchanged', () => {
    const result = capitalizeFirstLetter('this Is a Test');
    expect(result).toBe('This Is a Test');
  });

  it('should return empty if empty', () => {
    const result = capitalizeFirstLetter('');
    expect(result).toBe('');
  });

  it('should return null if null', () => {
    const result = capitalizeFirstLetter(null);
    expect(result).toBe(null);
  });

  it('should return undefined if undefined', () => {
    const result = capitalizeFirstLetter(undefined);
    expect(result).toBe(undefined);
  });
});
