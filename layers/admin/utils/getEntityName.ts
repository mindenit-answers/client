export function getEntityName<
  T extends { id: number },
  K extends keyof T & string,
  D extends string | number = string | number
>(
  collection: T[] | undefined | null,
  id: number | string,
  nameField: K,
  defaultValue: D = id as D
): string | D {
  if (!collection) return defaultValue
  const item = collection.find((item) => item.id === Number(id))
  return item ? String(item[nameField]) : defaultValue
}
