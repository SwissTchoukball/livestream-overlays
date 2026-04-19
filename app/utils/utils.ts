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
