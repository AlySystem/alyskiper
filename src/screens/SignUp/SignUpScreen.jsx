import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  Linking,
  TouchableOpacity,
  Keyboard
} from 'react-native'
import { showMessage } from 'react-native-flash-message'
import { useMutation } from '@apollo/react-hooks'
import CheckBox from 'react-native-check-box'

// Import mutations
import { SIGNUP } from '../../graphql/mutations/Mutations'

// Import components
import Background from '../../components/background/Background'
import InputControl from '../../components/input/InputControl'
import IconButton from '../../components/button/IconButton'
import Title from '../../components/title/Title'
import ModalPicker from '../../components/modal/ModalPicker'
import Snow from '../../components/snow/Snow'

// Import theme
import { Theme } from '../../constants/Theme'

const { height } = Dimensions.get('window')

const SignUpScreen = props => {
  const [checked, setChecked] = useState(false)
  const [SignUp, { loading }] = useMutation(SIGNUP)

  const [name, setName] = useState('')
  const [nameIsValid, setNameIsValid] = useState({
    isValid: false,
    message: '',
    errorStyle: true
  })
  const handleName = value => {
    const valuePattern = new RegExp(/^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/)

    if (!value) {
      setNameIsValid({ isValid: false, message: 'El nombre es requerido.', errorStyle: false })
    } else if (!valuePattern.test(value)) {
      setNameIsValid({ isValid: false, message: 'El nombre es invalido.', errorStyle: false })
    } else {
      setNameIsValid({ isValid: true, message: '', errorStyle: true })
    }
    setName(value)
  }

  const [lastName, setLastName] = useState('')
  const [lastNameIsValid, setLastNameIsValid] = useState({
    isValid: false,
    message: '',
    errorStyle: true
  })
  const handleLastName = value => {
    const valuePattern = new RegExp(/^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/)

    if (!value) {
      setLastNameIsValid({ isValid: false, message: 'El apellido es requerido.', errorStyle: false })
    } else if (!valuePattern.test(value)) {
      setLastNameIsValid({ isValid: false, message: 'El apellido es invalido.', errorStyle: false })
    } else {
      setLastNameIsValid({ isValid: true, message: '', errorStyle: true })
    }
    setLastName(value)
  }

  const [userName, setUserName] = useState('')
  const [userNameIsValid, setUserNameIsValid] = useState({
    isValid: false,
    message: '',
    errorStyle: true
  })
  const handleUserName = (value) => {
    if (!value) {
      setUserNameIsValid({ isValid: false, message: 'El nombre de usuario es requerido.', errorStyle: false })
    } else {
      setUserNameIsValid({ isValid: true, message: '', errorStyle: true })
    }
    setUserName(value)
  }

  const [email, setEmail] = useState('')
  const [emailIsValid, setEmailIsValid] = useState({
    isValid: false,
    message: '',
    errorStyle: true
  })
  const handleEmail = value => {
    const emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)

    if (!value) {
      setEmailIsValid({ isValid: false, message: 'El correo es requerido.', errorStyle: false })
    } else if (!emailPattern.test(value)) {
      setEmailIsValid({ isValid: false, message: 'El correo es invalido.', errorStyle: false })
    } else {
      setEmailIsValid({ isValid: true, message: '', errorStyle: true })
    }
    setEmail(value.toLowerCase())
  }

  const [numberPhone, setNumberPhone] = useState('')
  const [phoneCode, setPhoneCode] = useState({})
  const [numberPhoneIsValid, setNumberPhoneIsValid] = useState({
    isValid: false,
    message: '',
    errorStyle: true
  })
  const handleOnChange = value => {
    if (!value) {
      setNumberPhoneIsValid({ isValid: false, message: 'El numero es requerido.', errorStyle: false })
    } else {
      setNumberPhoneIsValid({ isValid: true, message: '', errorStyle: true })
    }
    setNumberPhone(value)
  }

  const handleOnSelectPhone = (details) => {
    setPhoneCode(details)
  }

  const [details, setDetails] = useState('')

  const [password, setPassword] = useState('')
  const [passwordIsValid, setPasswordIsValid] = useState({
    isValid: false,
    message: '',
    errorStyle: true
  })
  const handlePassword = value => {
    if (!value) {
      setPasswordIsValid({ isValid: false, message: 'La contraseña es requerida.', errorStyle: false })
    } else if (value.length < 8) {
      setPasswordIsValid({ isValid: false, message: 'La contraseña debe ser mayor a 8 digitos.', errorStyle: false })
    } else {
      setPasswordIsValid({ isValid: true, message: '', errorStyle: true })
    }
    setPassword(value)
  }

  const [verifyPassword, setVerifyPassword] = useState('')
  const [verifyPasswordIsValid, setVerifyPasswordIsValid] = useState({
    isValid: false,
    message: '',
    errorStyle: true
  })
  const handleVerifyPassword = value => {
    if (!value) {
      setVerifyPasswordIsValid({ isValid: false, message: 'La contraseña es requerida.', errorStyle: false })
    } else if (value.length < 8) {
      setVerifyPasswordIsValid({ isValid: false, message: 'La contraseña debe ser mayor a 8 digitos.', errorStyle: false })
    } else {
      setVerifyPasswordIsValid({ isValid: true, message: '', errorStyle: true })
    }
    setVerifyPassword(value)
  }

  const [sponsorId, setSponsorId] = useState('')

  const handleOnSelect = (details) => {
    setDetails(details.id)
  }

  const handleConfirmPassword = () => {
    if (password !== verifyPassword) {
      showMessage({
        message: 'Error',
        description: 'Las contraseñas no coinciden',
        backgroundColor: 'red',
        color: '#fff',
        icon: 'danger',
        titleStyle: {
          fontFamily: 'Lato-Bold'
        },
        textStyle: {
          fontFamily: 'Lato-Regular'
        }
      })
      return false
    }
    return true
  }

  const handleIsChecked = () => {
    if (!checked) {
      showMessage({
        message: 'Error',
        description: 'Por favor acepte los terminos y condiciones para seguir adelante.',
        backgroundColor: 'red',
        color: '#fff',
        icon: 'danger',
        titleStyle: {
          fontFamily: 'Lato-Bold'
        },
        textStyle: {
          fontFamily: 'Lato-Regular'
        }
      })
      return false
    }
    return true
  }

  const handleOnSubmit = async () => {
    if (handleConfirmPassword()) {
      if (handleIsChecked()) {
        if (nameIsValid.isValid && lastNameIsValid.isValid && userNameIsValid.isValid && emailIsValid.isValid && passwordIsValid.isValid) {
          Keyboard.dismiss()

          const result = await SignUp({
            variables: {
              input: {
                firstname: name,
                lastname: lastName,
                email: email,
                user: userName,
                password: password,
                phone: `${phoneCode.phoneCode}${numberPhone}`,
                country_id: details,
                sponsor_id: parseInt(sponsorId) || 1
              }
            }
          })

          const { error, data } = result.data.signup
          if (error) {
            if (error.message === 'This email or phone is already exist in the database!') {
              showMessage({
                message: 'Error',
                description: 'El correo ya esta registrado.',
                backgroundColor: 'red',
                color: '#fff',
                icon: 'danger',
                titleStyle: {
                  fontFamily: 'Lato-Bold'
                },
                textStyle: {
                  fontFamily: 'Lato-Regular'
                }
              })
            } else if (error.message === 'Sponsor ID is not valid!') {
              showMessage({
                message: 'Error',
                description: 'El codigo de invitado no es valido.',
                backgroundColor: 'red',
                color: '#fff',
                icon: 'danger',
                titleStyle: {
                  fontFamily: 'Lato-Bold'
                },
                textStyle: {
                  fontFamily: 'Lato-Regular'
                }
              })
            }
          } else {
            showMessage({
              message: 'AlySkiper',
              description: `${data.username} registrado correctamente.`,
              backgroundColor: 'green',
              color: '#fff',
              type: 'success',
              icon: 'success',
              titleStyle: {
                fontFamily: 'Lato-Bold'
              },
              textStyle: {
                fontFamily: 'Lato-Regular'
              }
            })
            props.navigation.push('SignIn')
          }
        }
      }
    }
  }

  return (
    <>
      <Background>
        <Snow />

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
                value={name}
                setValue={setName}
                placeholder='Nombre'
                placeholderTextColor={Theme.COLORS.colorParagraph}
                onChangeText={handleName}
                isActiveButton
                isActiveIcon
                iconSize={25}
                iconColor={Theme.COLORS.colorSecondary}
                iconName='person'
                stylesInput={[styles.stylesInput, { borderColor: nameIsValid.errorStyle ? Theme.COLORS.colorSecondary : 'red' }]}
                isValid={nameIsValid.isValid}
                errorText={nameIsValid.message}
              />

              <InputControl
                value={lastName}
                setValue={setLastName}
                placeholder='Apellido'
                placeholderTextColor={Theme.COLORS.colorParagraph}
                onChangeText={handleLastName}
                isActiveButton
                isActiveIcon
                iconSize={25}
                iconColor={Theme.COLORS.colorSecondary}
                iconName='people'
                stylesInput={[styles.stylesInput, { borderColor: lastNameIsValid.errorStyle ? Theme.COLORS.colorSecondary : 'red' }]}
                isValid={lastNameIsValid.isValid}
                errorText={lastNameIsValid.message}
              />

              <InputControl
                value={userName}
                setValue={setUserName}
                placeholder='Nombre de usuario'
                placeholderTextColor={Theme.COLORS.colorParagraph}
                onChangeText={handleUserName}
                isActiveButton
                isActiveIcon
                iconSize={25}
                iconColor={Theme.COLORS.colorSecondary}
                iconName='person'
                stylesInput={[styles.stylesInput, { borderColor: userNameIsValid.errorStyle ? Theme.COLORS.colorSecondary : 'red' }]}
                isValid={userNameIsValid.isValid}
                errorText={userNameIsValid.message}
              />

              <View style={styles.containerRow}>
                <ModalPicker
                  handleOnSelect={handleOnSelectPhone}
                />
                <InputControl
                  stylesContainer={styles.containerInput}
                  value={numberPhone}
                  isActiveIcon
                  iconName='phone'
                  iconSize={22}
                  stylesIcon={styles.icon}
                  placeholder='7728  9801'
                  placeholderTextColor={Theme.COLORS.colorParagraphSecondary}
                  onChangeText={handleOnChange}
                  keyboardType='number-pad'
                  stylesError={styles.stylesError}
                  stylesInput={[styles.input, { borderColor: numberPhoneIsValid.errorStyle ? Theme.COLORS.colorSecondary : 'red' }]}
                  isValid={numberPhoneIsValid.isValid}
                  errorText={numberPhoneIsValid.message}
                />
              </View>

              <InputControl
                value={email}
                setValue={setEmail}
                placeholder='Correo'
                placeholderTextColor={Theme.COLORS.colorParagraph}
                onChangeText={handleEmail}
                isActiveButton
                keyboardType='email-address'
                isActiveIcon
                iconSize={25}
                iconColor={Theme.COLORS.colorSecondary}
                iconName='mail'
                stylesInput={[styles.stylesInput, { borderColor: emailIsValid.errorStyle ? Theme.COLORS.colorSecondary : 'red' }]}
                isValid={emailIsValid.isValid}
                errorText={emailIsValid.message}
              />

              <ModalPicker
                activeCountry
                handleOnSelect={handleOnSelect}
              />

              <InputControl
                value={password}
                setValue={setPassword}
                placeholder='Contraseña'
                placeholderTextColor={Theme.COLORS.colorParagraph}
                onChangeText={handlePassword}
                isActiveButton
                isActiveIcon
                iconSize={25}
                iconColor={Theme.COLORS.colorSecondary}
                iconName='lock'
                secureTextEntry
                stylesInput={[styles.stylesInput, { borderColor: passwordIsValid.errorStyle ? Theme.COLORS.colorSecondary : 'red' }]}
                isValid={passwordIsValid.isValid}
                errorText={passwordIsValid.message}
              />

              <InputControl
                value={verifyPassword}
                setValue={setVerifyPassword}
                placeholder='Confirmar contraseña'
                placeholderTextColor={Theme.COLORS.colorParagraph}
                onChangeText={handleVerifyPassword}
                isActiveButton
                isActiveIcon
                iconSize={25}
                iconColor={Theme.COLORS.colorSecondary}
                iconName='lock'
                secureTextEntry
                stylesInput={[styles.stylesInput, { borderColor: verifyPasswordIsValid.errorStyle ? Theme.COLORS.colorSecondary : 'red' }]}
                isValid={verifyPasswordIsValid.isValid}
                errorText={verifyPasswordIsValid.message}
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
              <View style={styles.containerTerm}>
                <CheckBox
                  onClick={() => setChecked(!checked)}
                  isChecked={checked}
                  checkBoxColor={Theme.COLORS.colorSecondary}
                />
                <View style={{ flexDirection: 'row' }}>
                  <Text allowFontScaling={false} style={styles.description}>He leído y acepto los </Text>
                  <TouchableOpacity
                    onPress={() => Linking.openURL('https://alyskiper.com/terms')}
                  >
                    <Text
                      allowFontScaling={false}
                      style={styles.descriptionBold}
                    >términos y condiciones
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.containerButton}>
                <IconButton
                  message='REGISTRATE'
                  isActiveIcon
                  isLoading={loading}
                  stylesButton={styles.button}
                  iconName='person-add'
                  onPress={handleOnSubmit}
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
  },
  stylesInput: {
    backgroundColor: Theme.COLORS.colorMainDark,
    borderRadius: 100,
    paddingLeft: 55,
    paddingVertical: 12,
    marginBottom: height * 0.03,
    borderWidth: 0.3,
    borderColor: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    color: Theme.COLORS.colorParagraph
  },
  containerTerm: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15
  },
  description: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Regular'
  },
  descriptionBold: {
    color: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Bold',
    fontSize: 14
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: Theme.COLORS.colorSecondary,
    borderWidth: 0.3,
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: Theme.COLORS.colorMainAlt,
    marginBottom: height * 0.03
  },
  containerInput: {
    position: 'relative'
  },
  input: {
    width: 180,
    height: 40,
    paddingLeft: 48,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    color: Theme.COLORS.colorParagraph,
    borderLeftColor: Theme.COLORS.colorSecondary,
    borderLeftWidth: 0.3
  },
  icon: {
    position: 'absolute',
    top: 9,
    left: 15
  }
})

export default SignUpScreen
