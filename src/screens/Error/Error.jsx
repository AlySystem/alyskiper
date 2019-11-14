import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

// Import theme
import { Theme } from '../../constants/Theme'

// Import components
import Picture from '../../components/picture/Picture'
import Title from '../../components/title/Title'

// Import image
import image from '../../../assets/images/img-alyskiper-warning.png'

const ErrorScreen = props => {
  const { navigate } = props.navigation
  const title = props.navigation.getParam('title')
  const message = props.navigation.getParam('message')
  const routeName = props.navigation.getParam('routeName')

  // const handleRequestDialog = async () => {
  //   LocationServicesDialogBox.checkLocationServicesIsEnabled({
  //     message: `<font color=${Theme.COLORS.colorParagraph}>Por favor activa el GPS del dispositivo.</font>`,
  //     ok: 'ACEPTAR',
  //     cancel: 'CANCELAR',
  //     style: {
  //       backgroundColor: Theme.COLORS.colorMain,

  //       positiveButtonTextColor: Theme.COLORS.colorParagraph,
  //       positiveButtonBackgroundColor: Theme.COLORS.colorMainAlt,

  //       negativeButtonTextColor: Theme.COLORS.colorParagraph,
  //       negativeButtonBackgroundColor: Theme.COLORS.colorMainAlt
  //     }
  //   }).then(function (success) {
  //     navigate(routeName)
  //   }).catch((error) => {
  //     console.log(error.message)
  //   })
  // }

  return (
    <View style={styles.container}>
      <Picture
        source={image}
        styles={styles.image}
      />
      <View style={{ paddingVertical: 10 }} />
      <Title
        title={props.title}
        styles={styles.title}
        stylesContainer={{}}
      />
      <View style={{ paddingVertical: 5 }} />
      <Text allowFontScaling={false} style={styles.message}>{message}</Text>

      <View style={{ marginTop: 50 }}>
        {/* <IconButton
          message='ACTIVAR GPS'
          stylesButton={styles.button}
          stylesMessage={styles.message}
          isActiveIcon
          iconName='location-on'
          // onPress={handleRequestDialog}
        /> */}
        {/* <View style={{ paddingVertical: 10 }} />
        <IconButton
          message='SACAME DE AQUI'
          stylesButton={styles.button}
          stylesMessage={styles.stylesMessage}
          isActiveIcon
          iconName='reply'
          onPress={() => navigate('Home')}
        /> */}
      </View>
      <Text allowFontScaling={false} style={styles.message}>{props.message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.COLORS.colorMainAlt,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  image: {
    width: 100,
    height: 100
  },
  title: {
    fontFamily: 'Lato-Bold',
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.subTitle
  },
  message: {
    fontFamily: 'Lato-Bold',
    color: Theme.COLORS.colorParagraphSecondary,
    fontSize: Theme.SIZES.small,
    textAlign: 'center'
  }
})

export default ErrorScreen
