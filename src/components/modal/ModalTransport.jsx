import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import IconFont from 'react-native-vector-icons/FontAwesome'

// Import components
import Modal from './Modal'
import Icon from '../icon/Icon'
import Search from '../search/Search'
import Background from '../background/Background'

// Import containers
import ListOfAddress from '../../containers/ListOfAddress'

// Import theme
import { Theme } from '../../constants/Theme'

const ModalTransport = props => {
  const { isVisible, setIsVisible, navigation, location } = props
  const { navigate } = navigation

  return (
    <Modal
      isVisible={isVisible}
      animationInTiming={700}
      style={{
        margin: 0
      }}
    >
      <Background
        source={require('../../../assets/images/img-background-alyskiper.png')}
      >
        <View style={styles.container}>
          <Icon
            iconName='close'
            iconSize={30}
            onPress={() => setIsVisible(!isVisible)}
            styles={{
              paddingHorizontal: 10,
              position: 'absolute',
              top: 10,
              left: 5
            }}
          />
          <Search
            navigation={navigation}
            setIsVisible={setIsVisible}
            isVisible={isVisible}
            location={location}
          />
          <View style={{ marginVertical: 10 }} />
          <TouchableOpacity
            style={styles.containerText}
            onPress={() => {
              setIsVisible(!isVisible)
              return navigate('pickerTransport')
            }}
          >
            <IconFont name='map-pin' color={Theme.COLORS.colorSecondary} size={25} />
            <Text style={styles.text}>Seleccionar punto en el mapa</Text>
          </TouchableOpacity>
          <View style={{ marginVertical: 10 }} />
          <Text
            allowFontScaling={false} style={{
              color: Theme.COLORS.colorSecondary,
              fontFamily: 'Lato-Bold',
              fontSize: 18,
              paddingHorizontal: 5
            }}
          >DIRECCIONES
          </Text>
          <ListOfAddress
            navigation={navigation}
          />
        </View>
      </Background>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 55,
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  containerText: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.small,
    marginLeft: 10
  }
})

export default ModalTransport
