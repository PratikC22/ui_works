import { useCallback, useEffect, useState } from 'react'

// Storage type enum
export enum StorageType {
  LOCAL = 'localStorage',
  SESSION = 'sessionStorage',
}

// Base configuration interface
interface BaseStorageConfig<T> {
  key: string
  defaultValue: T
  storageType?: StorageType
}

// Configuration for getting storage value
interface GetStorageConfig<T> {
  key: string
  defaultValue: T
  storageType?: StorageType
  serialize?: (value: T) => string
  deserialize?: (value: string) => T
}

// Configuration for setting storage value
interface SetStorageConfig<T> {
  key: string
  storageType?: StorageType
  serialize?: (value: T) => string
}

// Configuration for removing storage value
interface RemoveStorageConfig {
  key: string
  storageType?: StorageType
}

// Configuration for clearing storage
interface ClearStorageConfig {
  storageType?: StorageType
}

// Configuration for the main hook
interface UseStorageConfig<T> extends BaseStorageConfig<T> {
  serialize?: (value: T) => string
  deserialize?: (value: string) => T
  syncAcrossTabs?: boolean
  validator?: (value: unknown) => value is T
  onError?: (error: Error, operation: string) => void
}

// Return type for the main hook
interface UseStorageReturn<T> {
  value: T
  setValue: (config: { value: T; serialize?: (value: T) => string }) => void
  removeValue: () => void
  isLoading: boolean
  error: Error | null
  clearStorage: (config?: ClearStorageConfig) => void
  getStorageValue: <K>(config: GetStorageConfig<K>) => K
  setStorageValue: <K>(config: SetStorageConfig<K> & { value: K }) => void
  removeStorageValue: (config: RemoveStorageConfig) => void
}

// Utility function to get storage object
const getStorageObject = (type: StorageType): Storage | null => {
  if (typeof window === 'undefined') return null

  switch (type) {
    case StorageType.LOCAL:
      return window.localStorage
    case StorageType.SESSION:
      return window.sessionStorage
    default:
      return window.localStorage
  }
}

// Default serialization functions
const defaultSerialize = <T>(value: T): string => {
  if (typeof value === 'string') return value
  return JSON.stringify(value)
}

const defaultDeserialize = <T>(value: string): T => {
  try {
    return JSON.parse(value) as T
  } catch {
    return value as T
  }
}

// Generic storage operations
export const storageOperations = {
  get: <T>(config: GetStorageConfig<T>): T => {
    const {
      key,
      defaultValue,
      storageType = StorageType.LOCAL,
      serialize = defaultSerialize,
      deserialize = defaultDeserialize,
    } = config

    try {
      const storage = getStorageObject(storageType)
      if (!storage) return defaultValue

      const item = storage.getItem(key)
      if (item === null) return defaultValue

      if (item === '') return defaultValue

      return deserialize(item)
    } catch (error) {
      console.warn(`Failed to get ${key} from ${storageType}:`, error)
      return defaultValue
    }
  },

  set: <T>(config: SetStorageConfig<T> & { value: T }): void => {
    const {
      key,
      value,
      storageType = StorageType.LOCAL,
      serialize = defaultSerialize,
    } = config

    try {
      const storage = getStorageObject(storageType)
      if (!storage) return

      const serializedValue = serialize(value)
      storage.setItem(key, serializedValue)
    } catch (error) {
      console.warn(`Failed to set ${key} in ${storageType}:`, error)
    }
  },

  remove: (config: RemoveStorageConfig): void => {
    const { key, storageType = StorageType.LOCAL } = config

    try {
      const storage = getStorageObject(storageType)
      if (!storage) return

      storage.removeItem(key)
    } catch (error) {
      console.warn(`Failed to remove ${key} from ${storageType}:`, error)
    }
  },

  clear: (config: ClearStorageConfig = {}): void => {
    const { storageType = StorageType.LOCAL } = config

    try {
      const storage = getStorageObject(storageType)
      if (!storage) return

      storage.clear()
    } catch (error) {
      console.warn(`Failed to clear ${storageType}:`, error)
    }
  },
}

// Main hook
export const useStorage = <T>(
  config: UseStorageConfig<T>
): UseStorageReturn<T> => {
  const {
    key,
    defaultValue,
    storageType = StorageType.LOCAL,
    serialize = defaultSerialize,
    deserialize = defaultDeserialize,
    syncAcrossTabs = false,
    validator,
    onError,
  } = config

  const [value, setValue] = useState<T>(defaultValue)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // Handle errors
  const handleError = useCallback(
    (err: Error, operation: string) => {
      setError(err)
      onError?.(err, operation)
    },
    [onError]
  )

  // Load initial value
  useEffect(() => {
    try {
      const storedValue = storageOperations.get({
        key,
        defaultValue,
        storageType,
        serialize,
        deserialize,
      })

      // Validate if validator is provided
      if (validator && !validator(storedValue)) {
        console.warn(`Invalid value for key ${key}, using default`)
        setValue(defaultValue)
      } else {
        setValue(storedValue)
      }
    } catch (err) {
      handleError(err as Error, 'load')
      setValue(defaultValue)
    } finally {
      setIsLoading(false)
    }
  }, [
    key,
    defaultValue,
    storageType,
    validator,
    handleError,
    serialize,
    deserialize,
  ])

  // Storage event listener for cross-tab sync
  useEffect(() => {
    if (!syncAcrossTabs || storageType !== StorageType.LOCAL) return

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        try {
          const newValue = deserialize(event.newValue)
          if (!validator || validator(newValue)) {
            setValue(newValue)
          }
        } catch (err) {
          handleError(err as Error, 'sync')
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key, storageType, syncAcrossTabs, validator, deserialize, handleError])

  // Set value function
  const setStorageValue = useCallback(
    (setConfig: { value: T; serialize?: (value: T) => string }) => {
      const { value: newValue, serialize: customSerialize } = setConfig

      try {
        storageOperations.set({
          key,
          value: newValue,
          storageType,
          serialize: customSerialize || serialize,
        })
        setValue(newValue)
        setError(null)
      } catch (err) {
        handleError(err as Error, 'set')
      }
    },
    [key, storageType, serialize, handleError]
  )

  // Remove value function
  const removeValue = useCallback(() => {
    try {
      storageOperations.remove({ key, storageType })
      setValue(defaultValue)
      setError(null)
    } catch (err) {
      handleError(err as Error, 'remove')
    }
  }, [key, storageType, defaultValue, handleError])

  // Clear storage function
  const clearStorage = useCallback(
    (clearConfig: ClearStorageConfig = {}) => {
      try {
        storageOperations.clear(clearConfig)
        setValue(defaultValue)
        setError(null)
      } catch (err) {
        handleError(err as Error, 'clear')
      }
    },
    [defaultValue, handleError]
  )

  // Generic get function
  const getStorageValue = useCallback(
    <K>(getConfig: GetStorageConfig<K>): K => {
      return storageOperations.get(getConfig)
    },
    []
  )

  // Generic set function
  const setStorageValueGeneric = useCallback(
    <K>(setConfig: SetStorageConfig<K> & { value: K }): void => {
      storageOperations.set(setConfig)
    },
    []
  )

  // Generic remove function
  const removeStorageValue = useCallback(
    (removeConfig: RemoveStorageConfig): void => {
      storageOperations.remove(removeConfig)
    },
    []
  )

  return {
    value,
    setValue: setStorageValue,
    removeValue,
    isLoading,
    error,
    clearStorage,
    getStorageValue,
    setStorageValue: setStorageValueGeneric,
    removeStorageValue,
  }
}

// Convenience hooks for specific storage types
export const useLocalStorage = <T>(
  config: Omit<UseStorageConfig<T>, 'storageType'>
) => {
  return useStorage({ ...config, storageType: StorageType.LOCAL })
}

export const useSessionStorage = <T>(
  config: Omit<UseStorageConfig<T>, 'storageType'>
) => {
  return useStorage({ ...config, storageType: StorageType.SESSION })
}

// Type-safe hooks for common data types
export const useStorageString = (
  config: Omit<UseStorageConfig<string>, 'serialize' | 'deserialize'>
) => {
  return useStorage({
    ...config,
    serialize: (value: string) => value,
    deserialize: (value: string) => value,
  })
}

export const useStorageNumber = (
  config: Omit<UseStorageConfig<number>, 'serialize' | 'deserialize'>
) => {
  return useStorage({
    ...config,
    serialize: (value: number) => value.toString(),
    deserialize: (value: string) => parseFloat(value) || config.defaultValue,
  })
}

export const useStorageBoolean = (
  config: Omit<UseStorageConfig<boolean>, 'serialize' | 'deserialize'>
) => {
  return useStorage({
    ...config,
    serialize: (value: boolean) => JSON.stringify(value),
    deserialize: (value: string) => {
      try {
        const parsed = JSON.parse(value)
        return typeof parsed === 'boolean' ? parsed : config.defaultValue
      } catch {
        return config.defaultValue
      }
    },
  })
}

// Example usage types
export interface UserPreferences {
  theme: 'light' | 'dark'
  language: string
  notifications: boolean
}

export interface AppSettings {
  autoSave: boolean
  debugMode: boolean
  version: string
}

// Usage examples (commented out for the hook file):
/*
// Basic usage
const { value, setValue, removeValue, isLoading, error } = useStorage({
  key: 'user-preferences',
  defaultValue: { theme: 'light', language: 'en', notifications: true } as UserPreferences,
  syncAcrossTabs: true,
  validator: (value): value is UserPreferences => {
    return typeof value === 'object' && 
           value !== null && 
           'theme' in value && 
           'language' in value && 
           'notifications' in value
  }
})

// Set value
setValue({ 
  value: { theme: 'dark', language: 'es', notifications: false }
})

// Using convenience hooks
const { value: autoPreview, setValue: setAutoPreview } = useStorageBoolean({
  key: 'auto-preview',
  defaultValue: false,
  storageType: StorageType.LOCAL
})

// Generic operations
const { getStorageValue, setStorageValue, removeStorageValue } = useStorage({
  key: 'main',
  defaultValue: null
})

// Get any value
const settings = getStorageValue<AppSettings>({
  key: 'app-settings',
  defaultValue: { autoSave: true, debugMode: false, version: '1.0' }
})

// Set any value
setStorageValue({
  key: 'app-settings',
  value: { autoSave: false, debugMode: true, version: '1.1' }
})
*/
