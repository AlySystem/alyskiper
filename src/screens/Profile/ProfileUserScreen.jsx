import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import ImagePicker from 'react-native-image-picker'

// Import theme
import { Theme } from '../../constants/Theme'

// Import components
import Background from '../../components/background/Background'
import Title from '../../components/title/Title'
import Picture from '../../components/picture/Picture'
import Button from '../../components/button/Button'

const ProfileUserScreen = () => {
  const [photo, setPhoto] = useState({ uri: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png' })

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

  return (
    <Background>
      <View style={styles.screen}>
        <View style={styles.container}>
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
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  container: {
    paddingHorizontal: 10
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
    width: 120,
    height: 120,
    borderRadius: 100,
    backgroundColor: Theme.COLORS.colorMain
  },
  containerImage: {
    position: 'relative',
    width: 120,
    height: 120
  },
  button: {
    position: 'absolute',
    bottom: 8,
    right: 7
  }
})

export default ProfileUserScreen
