// "Polyfill" for IE's lack of support for new Map(iterable).
// Transforms a 2D key-value Array ([[k,v], [k,v], ...]) into a map.
// Currently no error-checking.
export const arrayToMap = a => {
  const result = new Map();
  a.forEach(e => result.set(e[0], e[1]));
  return result;
};

// "Polyfill" for IE's lack of support for Map.prototype.keys().
// Transforms a Map into an array of keys.
export const mapKeysToArray = m => {
  const result = [];

  m.forEach((value, key) => {
    result.push(key);
  });

  return result;
};
