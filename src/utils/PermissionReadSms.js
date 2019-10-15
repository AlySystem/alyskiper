import {
  PermissionsAndroid
} from 'react-native'

export const ReadSms = async () => {
  try {
    let granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_SMS)
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('sms read permissions granted', granted)
      granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECEIVE_SMS)

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('RECEIVE_SMS permissions granted', granted)
      } else {
        console.log('RECEIVE_SMS permissions denied')
      }
    } else {
      console.log('sms read permissions denied')
    }
  } catch (err) {
    console.log(err)
  }
}
