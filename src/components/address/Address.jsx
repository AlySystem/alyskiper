import React from 'react'
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native'

// Import components
import InputControl from '../input/InputControl'
import Title from '../title/Title'
import IconButton from '../button/IconButton'

// Import theme
import { Theme } from '../../constants/Theme'

const Address = props => {
  return (
    <View style={styles.container}>
      <Title
        title='COMPLETA LOS DATOS'
        stylesContainer={{}}
        styles={styles.title}
      />
      <ScrollView
        keyboardShouldPersistTaps='always'
      >

        <View style={styles.containerButton}>
          <IconButton
            message='ACEPTAR'
            isActiveIcon
          />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  containerButton: {
    width: '100%',
    alignItems: 'center'
  },
  title: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.normal,
    textAlign: 'center'
  }
})

export default Address
