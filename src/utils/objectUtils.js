export const removeProperty = (obj, propertyName) => {
  const { [propertyName]: omit, ...result } = obj;
  return result;
};
