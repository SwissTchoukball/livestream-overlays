import { parse } from 'date-fns/parse';

/**
 * Parses a date provided by Clupik
 *
 * Clupik provides dates in UTC, even though it is not specified in the given string.
 *
 * This makes sure the timezone information is properly added to the Date.
 */
export const parseClupikDate = (clupikDate: string): Date | undefined => {
  // We manually and explicitely set that the provided date is UTC (Z)
  const parsedDate = parse(`${clupikDate} Z`, 'yyyy-MM-dd HH:mm:ss X', new Date());
  return parsedDate || undefined;
};

/**
 * Validates a color coming from a query parameter.
 *
 * Accepts a bare hexadecimal value (without `#`), a full hexadecimal value or a CSS named color.
 */
export const validateColor = (colorQuery: string | (string | null)[] | undefined | null): string | undefined => {
  const color = Array.isArray(colorQuery) ? colorQuery[0] : colorQuery;
  if (color?.match(/^[0-9A-Fa-f]{6}$/)) {
    return `#${color}`;
  }
  if (color?.match(/^[a-zA-Z]+$/) || color?.match(/^#([0-9A-Fa-f]{6})$/)) {
    return color;
  }
  return undefined;
};
