import React from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import { useDispatch } from 'react-redux'

// Import components
import Title from '../title/Title'
import Button from '../button/Button'
import Picture from '../picture/Picture'
import IconButton from '../button/IconButton'
import Background from '../background/Background'

// Action types
import { ACTIVE } from '../../store/actionTypes'

// Import image
import logo from '../../../assets/images/img-alyskiper-loader.png'
import background from '../../../assets/images/img-background-check.png'

// Import theme
import { Theme } from '../../constants/Theme'

const OrderCheck = props => {
  const dispatch = useDispatch()
  const handleOnSubmit = async () => {

  }

  return (
    <Background
      source={background}
    >
      <View style={styles.container}>
        <View style={styles.containerButton}>
          <Button
            iconName='cancel'
            onPress={() => props.setIsVisible(!props.isVisible)}
          />
        </View>
        <Picture
          source={logo}
        />
        <View style={{ paddingVertical: 8 }} />
        <Title
          stylesContainer={{}}
          title='SOLICITUD ENVIADA'
          styles={styles.title}
        />
        <View style={{ paddingVertical: 4 }} />
        <Text allowFontScaling={false} style={styles.description}>Tu orden ha sido enviada correctamente, se te notificara cuando tu orden este siendo procesada.</Text>
        <View style={{ paddingVertical: 20 }} />
        <IconButton
          message='VER ESTADO DE LA ORDEN'
          onPress={handleOnSubmit}
        />
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  containerButton: {
    position: 'absolute',
    right: 10,
    top: 10
  },
  title: {
    fontFamily: 'Lato-Bold',
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.normal
  },
  description: {
    fontFamily: 'Lato-Regular',
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.small,
    textAlign: 'center'
  }
})

export default OrderCheck
