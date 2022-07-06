export function removeProperty(
  obj: Record<string, any>,
  propertyName: string
): Record<string, any> {
  const { [propertyName]: omit, ...result } = obj;
  return result;
}

// From https://stackoverflow.com/a/32108184/161457
// Does not walk prototype chain.
export function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}
