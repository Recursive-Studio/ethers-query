import { useMemo, useRef } from 'react'
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector.js'

const isPlainObject = (obj: unknown): obj is Record<string, unknown> =>
  typeof obj === 'object' && obj !== null && !Array.isArray(obj)

const deepEqual = (a: unknown, b: unknown): boolean => {
  if (a === b) return true
  if (typeof a !== typeof b) return false
  if (!isPlainObject(a) || !isPlainObject(b)) return false
  
  const keysA = Object.keys(a)
  const keysB = Object.keys(b)
  
  if (keysA.length !== keysB.length) return false
  
  return keysA.every(key => {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false
    return deepEqual(a[key], b[key])
  })
}

export function useSyncExternalStoreWithTracked<
  Snapshot extends Selection,
  Selection = Snapshot,
>(
  subscribe: (onStoreChange: () => void) => () => void,
  getSnapshot: () => Snapshot,
  getServerSnapshot: undefined | null | (() => Snapshot) = getSnapshot,
  isEqual: (a: Selection, b: Selection) => boolean = deepEqual,
) {
  const trackedKeys = useRef<string[]>([])
  
  const result = useSyncExternalStoreWithSelector<
    Snapshot,
    Selection
  >(
    subscribe,
    getSnapshot,
    getServerSnapshot,
    (x: Snapshot): Selection => x as unknown as Selection,
    (a: Selection, b: Selection) => {
      if (isPlainObject(a) && isPlainObject(b) && trackedKeys.current.length) {
        for (const key of trackedKeys.current) {
          const equal = isEqual(
            a[key] as Selection,
            b[key] as Selection,
          )
          if (!equal) return false
        }
        return true
      }
      return isEqual(a as Selection, b as Selection)
    },
  )

  return useMemo(() => {
    if (isPlainObject(result)) {
      const trackedResult = { ...result }
      const properties: PropertyDescriptorMap = {}
      
      for (const [key, value] of Object.entries(trackedResult)) {
        properties[key] = {
          configurable: false,
          enumerable: true,
          get: () => {
            if (!trackedKeys.current.includes(key)) {
              trackedKeys.current.push(key)
            }
            return value
          },
        }
      }
      
      Object.defineProperties(trackedResult, properties)
      return trackedResult
    }

    return result
  }, [result])
} 