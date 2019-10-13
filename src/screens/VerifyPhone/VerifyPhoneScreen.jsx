import React from 'react'
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native'

// Import components
import Background from '../../components/background/Background'
import Title from '../../components/title/Title'
import IconButton from '../../components/button/IconButton'
import Picture from '../../components/picture/Picture'

// Import theme
import { Theme } from '../../constants/Theme'

const VerifyPhoneScreen = props => {
  const { navigate } = props.navigation
  return (
    <Background>
      <View style={styles.screen}>
        <ScrollView
          keyboardShouldPersistTaps='always'
          contentContainerStyle={styles.scrollView}
        >
          <Picture />
          <Title
            title='INGRESE EL CODIGO'
            styles={styles.title}
          />
          <View style={styles.containerButton}>
            <IconButton
              isActiveIcon
              message='VERIFICAR'
              iconName='done'
              onPress={() => navigate('SignUp')}
            />
          </View>
        </ScrollView>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  containerButton: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollView: {
    flexGrow: 1
  },
  title: {
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.normal,
    fontFamily: 'Lato-Bold'
  }
})

export default VerifyPhoneScreen
