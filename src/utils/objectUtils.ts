export const removeProperty = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  propertyName: K
): Omit<T, K> => {
  const { [propertyName]: omit, ...result } = obj;
  return result;
};

// From https://stackoverflow.com/a/32108184/161457
// Does not walk prototype chain.
export const isEmpty = (obj: Record<string, any>): boolean =>
  Object.keys(obj).length === 0 && obj.constructor === Object;
