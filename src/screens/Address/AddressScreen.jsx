import React, { useState } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

// Import components
import Background from '../../components/background/Background'
import FloatingActionButton from '../../components/button/FloatingActionButton'
import Modal from '../../components/modal/Modal'
import Search from '../../components/search/Search'
import Header from '../../components/header/Header'
import Address from '../../components/address/Address'

// Import containers
import ListOfAddress from '../../containers/ListOfAddress'

// Import theme
import { Theme } from '../../constants/Theme'

const AddressScreen = props => {
  const { navigate } = props.navigation
  const [isVisible, setIsVisible] = useState(false)
  const [details, setDetails] = useState()

  const handleDetails = (placeId, details) => {
    setDetails({ placeId, details })
  }

  return (
    <Background>
      {isVisible && (
        <Modal
          animationIn='zoomIn'
          backgroundColor={Theme.COLORS.colorMainAlt}
          opacity={1}
          style={{
            margin: 0,
            justifyContent: 'flex-start',
            paddingHorizontal: 10,
            paddingVertical: 10
          }}
          isVisible={isVisible}
        >
          <Header
            stylesContainer={styles.header}
            animationImage='bounce'
            animationButton='fadeInRight'
            isActiveImage
            iconName='keyboard-backspace'
            onPress={() => setIsVisible(!isVisible)}
          />
          <View style={{ paddingVertical: 10 }} />
          {!details ? (
            <Search
              origen={{
                latitude: 12.104003,
                longitude: -86.266636
              }}
              handleDetails={handleDetails}
            />
          ) : (
            <Address />
          )}
        </Modal>
      )}
      <View style={styles.screen}>
        <ListOfAddress />
        <View style={styles.containerButtons}>
          <FloatingActionButton
            stylesButton={styles.button}
            isActive
            iconName='delete'
            iconSize={35}
            onPress={() => navigate('')}
          />
          <FloatingActionButton
            stylesButton={styles.button}
            isActive
            iconName='note-add'
            iconSize={35}
            onPress={() => setIsVisible(!isVisible)}
          />
        </View>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'rgba(0,0,0,.5)',
    flex: 1
  },
  containerButtons: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row'
  },
  button: {
    backgroundColor: Theme.COLORS.colorMainAlt,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    zIndex: 1000,
    borderRadius: 100,
    borderColor: Theme.COLORS.colorSecondary,
    borderWidth: 0.2,
    marginLeft: 15
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default AddressScreen
