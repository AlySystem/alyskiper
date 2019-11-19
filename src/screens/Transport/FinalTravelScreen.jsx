import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Stars from 'react-native-stars'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

// Import actions
import { REMOVEDIRECTION, REMOVEDETAILSTRAVEL, REMOVELOCATION, REMOVEACTIVETRAVEL } from '../../store/actionTypes'

// Import components
import Background from '../../components/background/Background'
import { LazyImage } from '../../components/lazy/LazyImage'
import TextArea from '../../components/input/TextArea'
import IconButton from '../../components/button/IconButton'

// Import theme
import { Theme } from '../../constants/Theme'

const FinalTravelScreen = props => {
  const { navigate } = props.navigation
  const dispatch = useDispatch()
  const [star, setStar] = useState()
  const [value, setValue] = useState('')
  const { drive } = useSelector(state => state.travel)
  // const driverId = drive.id
  console.log(drive)

  const handleOnSubmit = () => {
    dispatch({
      type: REMOVEDIRECTION
    })
    dispatch({
      type: REMOVEDETAILSTRAVEL
    })
    dispatch({
      type: REMOVELOCATION
    })
    dispatch({
      type: REMOVEACTIVETRAVEL
    })

    navigate('Home')
  }

  return (
    <Background>
      <View style={styles.screen}>
        <ScrollView keyboardShouldPersistTaps='always' contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.layout}>
            <Text allowFontScaling={false} style={styles.title}>COMPLETADO</Text>
            <View style={{ marginVertical: 10 }} />
            <LazyImage
              styleLazyImage={{
                width: 100,
                height: 100,
                resizeMode: 'cover',
                marginRight: 15,
                borderRadius: 200
              }}
              sourceLazy={require('../../../assets/images/img-lazy.png')}
              source={{ uri: drive.skiperagent.user.avatar }}
              styleImage={{
                width: 100,
                height: 100,
                resizeMode: 'cover',
                marginRight: 15,
                borderRadius: 200
              }}
            />
            <View style={{ marginVertical: 10 }} />
            <Text allowFontScaling={false} style={styles.driveName}>{drive.skiperagent.user.firstname}</Text>
            <View style={{ marginVertical: 5 }} />
            <Stars
              default={2.5}
              count={5}
              half
              update={value => setStar(value)}
              starSize={50}
              fullStar={<Icon name='star' size={40} style={[styles.myStarStyle]} />}
              emptyStar={<Icon name='star-outline' size={40} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />}
              halfStar={<Icon name='star-half' size={40} style={[styles.myStarStyle]} />}
            />
            <View style={{ marginVertical: 15 }} />
            <TextArea
              onChangeText={(value) => setValue(value)}
              maxLength={120}
              value={value}
              placeholder='Agrega una nota acerca del conductor...'
              placeholderTextColor={Theme.COLORS.colorParagraph}
              stylesContainer={styles.textArea}
              stylesInput={styles.input}
            />
            <View style={{ marginVertical: 20 }} />
            <IconButton
              message='ENVIAR VALORACION'
              onPress={() => handleOnSubmit}
            />
          </View>
        </ScrollView>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'rgba(0,0,0,.5)',
    flex: 1
  },
  layout: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20
  },
  title: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.normal
  },
  driveName: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.small
  },
  myStarStyle: {
    color: Theme.COLORS.colorSecondary,
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },
  myEmptyStarStyle: {
    color: Theme.COLORS.colorSecondary
  },
  input: {
    color: Theme.COLORS.colorSecondary
  },
  textArea: {
    width: '100%',
    height: 90,
    position: 'relative',
    backgroundColor: Theme.COLORS.colorMainDark,
    borderRadius: 12,
    borderColor: Theme.COLORS.colorSecondary,
    borderWidth: 0.2,
    paddingHorizontal: 10
  }
})

export default FinalTravelScreen
