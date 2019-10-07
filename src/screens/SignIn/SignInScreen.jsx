import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native'

// Import components
import Background from '../../components/background/Background'
import Picture from '../../components/picture/Picture'
import Title from '../../components/title/Title'
import InputControl from '../../components/input/InputControl'

// Import theme
import { Theme } from '../../constants/Theme'

const HomeScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Background>
      <View style={styles.screen}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps='always'
        >
          <Picture />
          <Title
            title='SING IN'
            styles={styles.title}
          />
          <View style={{ paddingVertical: 8 }} />
          <View style={styles.container}>
            <InputControl
              stylesInput={styles.stylesInput}
              value={email}
              placeholder='Correo'
              placeholderTextColor={Theme.COLORS.colorParagraph}
              onChangeText={value => setEmail(value)}
              keyboardType='email-address'
              isActiveButton
              isActiveIcon
              iconSize={25}
              iconColor={Theme.COLORS.colorSecondary}
              iconName='mail'
            />

            <InputControl
              stylesInput={styles.stylesInput}
              value={password}
              placeholder='Contraseña'
              placeholderTextColor={Theme.COLORS.colorParagraph}
              onChangeText={value => setPassword(value)}
              secureTextEntry
              isActiveButton
              isActiveIcon
              iconSize={25}
              iconColor={Theme.COLORS.colorSecondary}
              iconName='lock'
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
  scrollView: {
    flexGrow: 1
  },
  title: {
    fontFamily: 'Lato-Regular',
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.title
  },
  container: {
    paddingHorizontal: 10
  }
})

export default HomeScreen
