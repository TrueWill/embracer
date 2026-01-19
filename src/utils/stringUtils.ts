// based on https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
export const capitalizeFirstLetter = (s: string | null | undefined): string | null | undefined =>
  s && s.charAt(0).toUpperCase() + s.slice(1);
