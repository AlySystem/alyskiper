import {
  Platform,
  PermissionsAndroid
} from 'react-native'

export const permissionCamera = async () => {
  if (Platform.OS === 'ios' || (Platform.OS === 'android' && Platform.Version < 23)) {
    return true
  }

  const checkPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)

  if (checkPermission) {
    return true
  }

  const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)

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
