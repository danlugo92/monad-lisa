export const map = <T, U>(
  predicate: (item: T) => U,
  set: ReadonlySet<T>
): Set<U> => {
  const newSet = new Set<U>()
  for (const item of set) {
    newSet.add(predicate(item))
  }
  return newSet
}

export const filter = <T>(
  predicate: (item: T) => boolean,
  set: ReadonlySet<T>
): Set<T> => {
  const newSet = new Set<T>()
  for (const item of set) {
    if (predicate(item)) {
      newSet.add(item)
    }
  }
  return newSet
}

export const every = <T>(
  set: ReadonlySet<T>,
  predicate: (item: T) => boolean
): boolean => {
  let isEvery = false
  for (const item of set) {
    isEvery = predicate(item)
  }
  return isEvery
}

/**
 * Returns the first item from whatever iteration order the set provides.
 * @param set The set from which the item will be picked
 */
export const pickFirst = <T>(set: ReadonlySet<T>): T => {
  if (set.size < 1) throw new Error()
  let first
  for (const item of set) {
    first = item
    break
  }
  return first as T
}

type ReduceCallback<T, U> = (
  previousValue: U | null,
  currentValue: T | undefined,
  set?: ReadonlySet<T>
) => U

export const reduce = <T, U>(
  callbackfn: ReduceCallback<T, U>,
  set: ReadonlySet<T>
): U => {
  let result: U = callbackfn(null, undefined)

  for (const item of set) {
    result = callbackfn(result, item, set)
  }

  return result
}
