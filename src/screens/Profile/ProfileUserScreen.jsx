import React, { useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions
} from 'react-native'
import { useMutation } from '@apollo/react-hooks'
import { showMessage } from 'react-native-flash-message'
import ImagePicker from 'react-native-image-picker'
import { useSelector, useDispatch } from 'react-redux'
import FastImage from 'react-native-fast-image'

// Import theme
import { Theme } from '../../constants/Theme'

// Action types
import { USERDATA } from '../../store/actionTypes'

// Import components
import Background from '../../components/background/Background'
import Title from '../../components/title/Title'
import Button from '../../components/button/Button'
import InputControl from '../../components/input/InputControl'
import IconButton from '../../components/button/IconButton'
import Loader from '../../components/loader/Loader'
import ModalCity from '../../components/modal/ModalCity'
// import ModalPicker from '../../components/modal/ModalPicker'

// Import mutations
import { UPDATEUSER } from '../../graphql/mutations/Mutations'

// Import utils
import { setAsyncStorage, removeAsyncStorage } from '../../utils/AsyncStorage'
import { keys } from '../../utils/keys'

const { height } = Dimensions.get('window')

const ProfileUserScreen = () => {
  const userData = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const [cityId, setCityId] = useState(userData.city_id)
  const [isLoading, setIsLoading] = useState(false)
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
    console.log('entrre')
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response)
      if (response.didCancel) {
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      } else {
        const image = {
          uri: response.uri,
          type: 'image/jpeg',
          name: 'myImage' + '-' + Date.now() + '.jpg'
        }

        const imgBody = new FormData()
        imgBody.append('image', image)
        const url = 'https://backend-subir-imagenes.herokuapp.com/upload'
        setIsLoading(true)
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json'
          },
          body: imgBody
        })
          .then(response => response.json())
          .then(result => {
            const uri = result[0].path
            setPhoto({ uri })
            setIsLoading(false)
          })
          .catch(error => {
            setError(error)
            setIsLoading(false)
          })
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
  // const [details, setDetails] = useState('')

  // const handleOnSelect = (details) => {
  //   setDetails(details.id)
  // }

  const handleOnCity = cityId => {
    setCityId(cityId)
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
          country_id: userData.country_id,
          city_id: cityId
        }
      }
    })

    if (result.data) {
      const payload = {
        auth: true,
        userId: result.data.updateUser.id,
        userToken: userData.userToken,
        firstName: result.data.updateUser.firstname,
        lastName: result.data.updateUser.lastname,
        userName: result.data.updateUser.user,
        email: result.data.updateUser.email,
        phoneNumber: result.data.updateUser.phone,
        avatar: result.data.updateUser.avatar,
        country: result.data.updateUser.country.name,
        country_id: result.data.updateUser.country.id,
        cityName: result.data.updateUser.city.name,
        iso: result.data.updateUser.country.iso.toLowerCase(),
        city_id: result.data.updateUser.city.id
      }

      await removeAsyncStorage(keys.asyncStorageKey)
      await setAsyncStorage(keys.asyncStorageKey, payload)

      dispatch({
        type: USERDATA,
        payload
      })

      showMessage({
        message: 'AlySkiper',
        description: `${result.data.updateUser.user} actualizado correctamente.`,
        backgroundColor: 'green',
        color: '#fff',
        icon: 'success',
        titleStyle: {
          fontFamily: 'Lato-Bold'
        },
        textStyle: {
          fontFamily: 'Lato-Regular'
        }
      })
    }
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
            <Text allowFontScaling={false} style={styles.description}>Toda tu informacion personal</Text>
          </View>
          <View style={styles.containerImage}>
            <FastImage
              style={styles.image}
              source={photo}
              resizeMode={FastImage.resizeMode.cover}
            />

            {isLoading && (
              <View style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,.9)',
                borderRadius: 200
              }}
              >
                <Loader />
              </View>
            )}

            {!isLoading && (
              <Button
                stylesButton={styles.button}
                iconName='add-a-photo'
                iconSize={35}
                onPress={selectPhoto}
              />
            )}
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
            <ModalCity
              handleOnCity={handleOnCity}
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
