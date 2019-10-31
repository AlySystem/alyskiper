import AsyncStorage from '@react-native-community/async-storage'

export const setAsyncStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export const getAsyncStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      return value
    }
  } catch (error) {
    console.error(error)
    return false
  }
}

export const removeAsyncStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
    return true
  } catch (error) {
    console.log(error.message)
    return false
  }
}
