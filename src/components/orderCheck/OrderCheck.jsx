import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native'
import { useMutation } from '@apollo/react-hooks'
import { showMessage } from 'react-native-flash-message'
import LottieView from 'lottie-react-native'

// Import animation
import animation from '../../../animation.json'

// Import hooks
import { useNotificationOrder } from '../../hooks/useNotificationOrder'

// Import mutations
import { GENERATEORDER } from '../../graphql/mutations/Mutations'

// Import components
import Title from '../title/Title'
import IconButton from '../button/IconButton'
import Background from '../background/Background'
import Modal from '../modal/Modal'

// Import image
import background from '../../../assets/images/img-background-check.png'

// Import theme
import { Theme } from '../../constants/Theme'

const { width } = Dimensions.get('window')

const OrderCheck = props => {
  const { commerce, product } = props.order
  const { status } = useNotificationOrder(commerce.id, props.navigation.navigate)
  const [isVisible, setIsVisible] = useState(false)
  const [GenerateOrder, { loading, error, data }] = useMutation(GENERATEORDER, {
    onCompleted: () => {
      setIsVisible(!isVisible)
    }
  })

  // useEffect(() => {
  //   if (status.code === 2) {
  //     setIsVisible(!isVisible)
  //     props.setIsVisible(!props.isVisible)
  //   }
  // }, [status])

  if (error) {
    return showMessage({
      message: 'Error',
      description: 'No se ha podido enviar tu orden, por favor intente de nuevo o mas tarde.',
      backgroundColor: 'red',
      color: '#fff',
      icon: 'danger',
      titleStyle: {
        fontFamily: 'Lato-Bold'
      },
      textStyle: {
        fontFamily: 'Lato-Regular'
      }
    })
  }

  useEffect(() => {
    setTimeout(() => {
      GenerateOrder({
        variables: {
          inputorder: {
            userphone: '77825484',
            useraddress: 'Edificio escala',
            orderdate: '2019-12-1 15:57:00',
            totalprice: 200,
            numitem: 1,
            userID: 368,
            commerceID: 13
          },
          inputorderdetalle: [
            {
              quantity: 1,
              price: 0,
              discount: 0,
              size: 'prueba de tamano',
              addon: 'sin extra',
              extraPrice: 0,
              orderID: 15,
              itemID: 29
            }
          ]
        }
      })
    }, 3000)
  }, [])

  return (
    <Background source={background}>
      <View style={styles.container}>
        {loading && (
          <LottieView
            style={{
              height: 300,
              width: width,
              position: 'relative',
              top: 25
            }}
            source={animation}
            autoPlay
            loop
          />
        )}
        <Title
          stylesContainer={{}}
          title={loading ? 'PROCESANDO ORDEN...' : 'ORDEN ENVIADA'}
          styles={styles.title}
        />
        <View style={{ paddingVertical: 4 }} />
        {!data && (
          <Text allowFontScaling={false} style={styles.description}>Tu orden ha sido enviada correctamente</Text>
        )}
        <Modal
          isVisible={isVisible}
          style={{
            margin: 0,
            position: 'relative',
            justifyContent: 'flex-end'
          }}
          onSwipeComplete={() => setIsVisible(!isVisible)}
          swipeDirection={['down']}
        >
          <View
            style={{
              backgroundColor: Theme.COLORS.colorMainAlt,
              paddingVertical: 10,
              paddingHorizontal: 10,
              position: 'relative',
              height: 180,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={styles.text}>Tu orden fue enviada correctamente, ya puedes ver el estado de tu orden.</Text>
            <View style={{ paddingVertical: 8 }} />
            <IconButton
              message='VER ESTADO DE LA ORDEN'
              onPress={() => props.navigation.replace('OrderTracing', { commerceId: commerce.id })}
            />
          </View>
        </Modal>
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
    color: Theme.COLORS.colorSecondary,
    fontSize: Theme.SIZES.normal
  },
  description: {
    fontFamily: 'Lato-Regular',
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.small,
    textAlign: 'center'
  },
  text: {
    color: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
    fontSize: Theme.SIZES.small
  }
})

export default OrderCheck
