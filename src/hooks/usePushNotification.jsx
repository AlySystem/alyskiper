// import { useEffect } from 'react'
import { PushNotificationIOS } from 'react-native'
import PushNotification from 'react-native-push-notification'

import sound from '../../assets/sounds/notificacion.mp3'

// Import theme
import { Theme } from '../constants/Theme'

export const configure = () => {
  PushNotification.configure({
    onRegister: function (token) {
    },
    onNotification: function (notification) {
      notification.finish(PushNotificationIOS.FetchResult.NoData)
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true
    },
    popInitialNotification: true,
    requestPermissions: true
  })
}

export const notification = (title, message, description, subTitle) => {
  PushNotification.localNotification({
    utoCancel: true,
    largeIcon: '@drawable/icon',
    smallIcon: '@drawable/icon',
    bigText: subTitle,
    subText: description,
    color: Theme.COLORS.colorSecondary,
    vibrate: true,
    vibration: 300,
    title: title,
    message: message,
    playSound: true,
    soundName: sound.mp3
  })
}
