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

// Import theme
import { Theme } from '../../constants/Theme'

const ModalTransport = props => {
  const { isVisible, setIsVisible, navigation, location } = props
  const { navigate } = navigation

  return (
    <Modal
      onBackdropPress={() => setIsVisible(false)}
      isVisible={isVisible}
      animationInTiming={700}
      style={{ margin: 0 }}
    >
      <Background source={require('../../../assets/images/img-background-alyskiper.png')}>
        <View style={styles.container}>
          <View style={styles.button}>
            <Icon
              iconName='close'
              iconSize={35}
              onPress={() => setIsVisible(!isVisible)}
            />
          </View>
          <View style={styles.containerHeader}>
            <Search navigation={navigation} setIsVisible={setIsVisible} isVisible={isVisible} location={location} />
          </View>
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
        </View>
      </Background>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
    backgroundColor: 'rgba(0,0,0,.5)',
    position: 'relative'
  },
  containerText: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  text: {
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.small,
    marginLeft: 10
  },
  containerHeader: {
    position: 'relative',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    flexDirection: 'row-reverse',
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    paddingHorizontal: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    marginVertical: 4,
    position: 'absolute',
    right: 10,
    top: 5
  }
})

export default ModalTransport
