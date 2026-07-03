/**
 * Sanitizes a database record by dropping specific private attributes.
 */
export function excludeFields<T extends Record<string, any>, K extends keyof T>(
  record: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...record };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

/**
 * Sanitizes an array of database records by dropping specific private attributes.
 */
export function excludeFieldsMany<T extends Record<string, any>, K extends keyof T>(
  records: T[],
  keys: K[]
): Omit<T, K>[] {
  return records.map((record) => excludeFields(record, keys));
}
