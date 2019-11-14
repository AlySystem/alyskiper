import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

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
  const { isVisible, setIsVisible, navigation } = props

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
          />
          <View style={{ marginVertical: 20 }} />
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
  }
})

export default ModalTransport
