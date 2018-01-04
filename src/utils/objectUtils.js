export const removeProperty = (obj, propertyName) => {
  const { [propertyName]: omit, ...result } = obj;
  return result;
};

// From https://stackoverflow.com/a/32108184/161457
// Does not walk prototype chain.
export const isEmpty = obj =>
  Object.keys(obj).length === 0 && obj.constructor === Object;
