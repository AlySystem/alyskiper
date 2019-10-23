import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

// Import components
import Background from '../../components/background/Background'
import FloatingActionButton from '../../components/button/FloatingActionButton'

// Import containers
import ListOfAddress from '../../containers/ListOfAddress'

// Import theme
import { Theme } from '../../constants/Theme'

const AddressScreen = props => {
  return (
    <Background>
      <View style={styles.screen}>
        <ListOfAddress />
        <View style={styles.containerButtons}>
          <FloatingActionButton
            stylesButton={styles.button}
            isActive
            iconName='delete'
            iconSize={35}
          />
          <FloatingActionButton
            stylesButton={styles.button}
            isActive
            iconName='note-add'
            iconSize={35}
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
  }
})

export default AddressScreen
