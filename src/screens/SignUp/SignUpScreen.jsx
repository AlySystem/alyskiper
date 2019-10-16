import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native'

// Import components
import Background from '../../components/background/Background'
import InputControl from '../../components/input/InputControl'
import IconButton from '../../components/button/IconButton'
import Title from '../../components/title/Title'
import ModalPicker from '../../components/modal/ModalPicker'

// Import screen
import LoaderScreen from '../../screens/Loader/LoaderScreen'

// Import theme
import { Theme } from '../../constants/Theme'

const SignUpScreen = props => {
  const { navigate } = props.navigation

  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [verifyPassword, setVerifyPassword] = useState('')
  const [sponsorId, setSponsorId] = useState('')

  return (
    <>
      <Background>
        <View style={styles.screen}>
          <ScrollView
            keyboardShouldPersistTaps='always'
            contentContainerStyle={styles.scrollView}
          >
            <Title
              title='Crear una nueva cuenta'
              styles={styles.title}
              stylesContainer={styles.stylesContainer}
            />
            <View style={styles.layout}>
              <InputControl
                stylesInput={styles.stylesInput}
                value={name}
                setValue={setName}
                placeholder='Nombre'
                placeholderTextColor={Theme.COLORS.colorParagraph}
                onChangeText={value => setName(value)}
                isActiveButton
                isActiveIcon
                iconSize={25}
                iconColor={Theme.COLORS.colorSecondary}
                iconName='person'
              />

              <InputControl
                stylesInput={styles.stylesInput}
                value={lastName}
                setValue={setLastName}
                placeholder='Apellido'
                placeholderTextColor={Theme.COLORS.colorParagraph}
                onChangeText={value => setLastName(value)}
                isActiveButton
                isActiveIcon
                iconSize={25}
                iconColor={Theme.COLORS.colorSecondary}
                iconName='people'
              />

              <InputControl
                stylesInput={styles.stylesInput}
                value={userName}
                setValue={setUserName}
                placeholder='Nombre de usuario'
                placeholderTextColor={Theme.COLORS.colorParagraph}
                onChangeText={value => setUserName(value)}
                isActiveButton
                isActiveIcon
                iconSize={25}
                iconColor={Theme.COLORS.colorSecondary}
                iconName='person'
              />

              <InputControl
                stylesInput={styles.stylesInput}
                value={email}
                setValue={setEmail}
                placeholder='Correo'
                placeholderTextColor={Theme.COLORS.colorParagraph}
                onChangeText={value => setEmail(value)}
                isActiveButton
                keyboardType='email-address'
                isActiveIcon
                iconSize={25}
                iconColor={Theme.COLORS.colorSecondary}
                iconName='mail'
              />

              <ModalPicker
                activeCountry
              />

              <InputControl
                stylesInput={styles.stylesInput}
                value={password}
                setValue={setPassword}
                placeholder='Contraseña'
                placeholderTextColor={Theme.COLORS.colorParagraph}
                onChangeText={value => setPassword(value)}
                isActiveButton
                isActiveIcon
                iconSize={25}
                iconColor={Theme.COLORS.colorSecondary}
                iconName='lock'
                secureTextEntry
              />

              <InputControl
                stylesInput={styles.stylesInput}
                value={verifyPassword}
                setValue={setVerifyPassword}
                placeholder='Confirmar contraseña'
                placeholderTextColor={Theme.COLORS.colorParagraph}
                onChangeText={value => setVerifyPassword(value)}
                isActiveButton
                isActiveIcon
                iconSize={25}
                iconColor={Theme.COLORS.colorSecondary}
                iconName='lock'
                secureTextEntry
              />

              <InputControl
                stylesInput={styles.stylesInput}
                value={sponsorId}
                setValue={setSponsorId}
                placeholder='Codigo de invitacion'
                placeholderTextColor={Theme.COLORS.colorParagraph}
                onChangeText={value => setSponsorId(value)}
                isActiveButton
                isActiveIcon
                iconSize={25}
                iconColor={Theme.COLORS.colorSecondary}
                iconName='card-giftcard'
              />
              <View style={styles.containerButton}>
                <IconButton
                  message='REGISTRATE'
                  isActiveIcon
                  stylesButton={styles.button}
                  iconName='person-add'
                  onPress={() => navigate('Home')}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </Background>
    </>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  title: {
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.subTitle,
    fontFamily: 'Lato-Bold'
  },
  stylesContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  layout: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollView: {
    flexGrow: 1
  },
  containerButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  }
})

export default SignUpScreen
