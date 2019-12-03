import React, { useRef, useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableHighlight
} from 'react-native'

// Import components
import { Map } from '../../components/map/MapView'
import Modal from '../../components/modal/Modal'
import Button from '../../components/button/Button'
import Status from '../../components/order/Status'

// Import hooks
import { useLocation } from '../../hooks/useLocation'
import Background from '../../components/background/Background'
import { useNotificationOrder } from '../../hooks/useNotificationOrder'

// Import theme
import { Theme } from '../../constants/Theme'
import Title from '../../components/title/Title'
import Picture from '../../components/picture/Picture'

const OrderTracingScreen = props => {
  const commerceId = props.navigation.getParam('commerceId')
  useNotificationOrder(commerceId, props.navigation.navigate)
  const { location } = useLocation()
  const [visible, setVisible] = useState(false)
  const mapView = useRef(null)

  return (
    <View style={{ flex: 1, backgroundColor: Theme.COLORS.colorParagraph }}>
      {location.latitude && (<Map mapView={mapView} location={location} />)}
      <TouchableHighlight onPress={() => setVisible(!visible)} style={styles.modalButton}>
        <View style={{
          backgroundColor: Theme.COLORS.colorSecondary,
          height: 6,
          width: 60,
          borderRadius: 100
        }}
        />
      </TouchableHighlight>
      <Modal isVisible={visible} style={styles.modal}>
        <Background source={require('../../../assets/images/img-background-alyskiper.png')}>
          <View style={styles.container}>
            <Button
              iconName='cancel'
              stylesButton={styles.cancelButton}
              onPress={() => setVisible(!visible)}
            />
            <Title title='ESTADO DE LA ORDEN' styles={styles.title} />
            <View style={{ marginVertical: 5 }} />
            <Status />

            <View style={{ marginVertical: 10 }} />
            <Title title='Metodo de pago' styles={styles.message} stylesContainer={{}} />
          </View>
          <Picture
            styles={styles.logo}
            source={require('../../../assets/images/img-logo-alysystem.png')}
          />
        </Background>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: Theme.COLORS.colorMainAlt,
    margin: 0
  },
  container: {
    backgroundColor: 'rgba(0,0,0,.5)',
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  title: {
    textAlign: 'center',
    color: Theme.COLORS.colorSecondary,
    fontSize: Theme.SIZES.normal,
    fontFamily: 'Lato-Bold'
  },
  modalButton: {
    backgroundColor: Theme.COLORS.colorMainAlt,
    height: 60,
    position: 'relative',
    bottom: 0,
    left: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10
  },
  cancelButton: {
    position: 'absolute',
    top: 5,
    right: 10
  },
  logo: {
    position: 'absolute',
    bottom: 0,
    left: 4,
    resizeMode: 'contain',
    height: 50,
    width: 120
  },
  message: {
    color: Theme.COLORS.colorSecondary,
    fontSize: Theme.SIZES.small,
    fontFamily: 'Lato-Bold'
  }
})

export default OrderTracingScreen
