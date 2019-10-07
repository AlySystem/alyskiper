import {
  Platform,
  PermissionsAndroid
} from 'react-native'

export const hasLocationPermission = async () => {
  if (Platform.OS === 'ios' || (Platform.OS === 'android' && Platform.Version < 23)) {
    return true
  }

  const checkPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)

  if (checkPermission) {
    return true
  }

  const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true
  }
  if (status === PermissionsAndroid.RESULTS.DENIED) {
    return false
  } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    return false
  }
  return false
}
