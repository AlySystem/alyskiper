import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native'
import { useMutation } from '@apollo/react-hooks'
import ImagePicker from 'react-native-image-picker'
import { useSelector, useDispatch } from 'react-redux'

// Import theme
import { Theme } from '../../constants/Theme'

// Action types
import { USERDATA } from '../../store/actionTypes'

// Import components
import Background from '../../components/background/Background'
import Title from '../../components/title/Title'
import Picture from '../../components/picture/Picture'
import Button from '../../components/button/Button'
import InputControl from '../../components/input/InputControl'
import IconButton from '../../components/button/IconButton'

// Import mutations
import { UPDATEUSER } from '../../graphql/mutations/Mutations'

const { height } = Dimensions.get('window')

const ProfileUserScreen = () => {
  const userData = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [UpdateUser, { loading }] = useMutation(UPDATEUSER)

  const [photo, setPhoto] = useState({ uri: userData.avatar })
  const options = {
    title: 'Seleccionar imagen',
    takePhotoButtonTitle: 'Tomar foto',
    cancelButtonTitle: 'Cancelar',
    chooseFromLibraryButtonTitle: 'Seleccionar de la galeria',
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  }

  const selectPhoto = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response)
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        const source = response
        setPhoto(source)
      }
    })
  }

  const [name, setName] = useState(userData.firstName)
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

  const [lastName, setLastName] = useState(userData.lastName)
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

  const [userName, setUserName] = useState(userData.userName)
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

  const [email, setEmail] = useState(userData.email)
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

  const handleOnSubmit = async () => {
    const result = await UpdateUser({
      variables: {
        input: {
          id: userData.userId,
          firstname: name,
          lastname: lastName,
          username: userName,
          email: email,
          avatar: photo.uri,
          phone: userData.phoneNumber,
          country_id: userData.country_id
        }
      }
    })
    const payload = {
      auth: true,
      userToken: result.data.token,
      userId: result.userId,
      firstName: result.data.firstname,
      lastName: result.data.lastname,
      userName: result.data.user,
      email: result.data.email,
      phoneNumber: result.data.phone,
      avatar: result.data.avatar,
      country: result.data.country.name,
      country_id: result.data.country.id
    }

    dispatch({
      type: USERDATA,
      payload
    })
  }

  return (
    <Background>
      <View style={styles.screen}>
        <View style={styles.container}>
          <View>
            <Title
              title='Mi cuenta'
              stylesContainer
              styles={styles.title}
            />
            <View style={{ paddingVertical: 1 }} />
            <Text style={styles.description}>Toda tu informacion personal</Text>
          </View>
          <View style={styles.containerImage}>
            <Picture
              source={photo}
              styles={styles.image}
            />
            <Button
              stylesButton={styles.button}
              iconName='add-a-photo'
              iconSize={35}
              onPress={selectPhoto}
            />
          </View>
        </View>
        <ScrollView
          keyboardShouldPersistTaps='always'
          contentContainerStyle={styles.scrollView}
        >
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
            <View style={styles.containerButton}>
              <IconButton
                message='ACEPTAR'
                isActiveIcon
                isLoading={loading}
                stylesButton={styles.buttonIcon}
                iconName='check'
                onPress={handleOnSubmit}
              />
            </View>
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
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.title
  },
  description: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: Theme.COLORS.colorMain,
    borderColor: Theme.COLORS.colorSecondary,
    borderWidth: 1
  },
  containerImage: {
    position: 'relative',
    width: 80,
    height: 80
  },
  button: {
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  layout: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  scrollView: {
    flexGrow: 1
  },
  containerButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 30
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
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.03
  },
  containerInput: {
    position: 'relative'
  },
  input: {
    width: 230,
    backgroundColor: Theme.COLORS.colorMainDark,
    borderRadius: 40,
    paddingLeft: 48,
    paddingVertical: 12,
    borderWidth: 0.3,
    borderColor: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    color: Theme.COLORS.colorParagraph
  },
  stylesError: {
    position: 'absolute',
    bottom: -18,
    left: 10
  }
})

export default ProfileUserScreen
