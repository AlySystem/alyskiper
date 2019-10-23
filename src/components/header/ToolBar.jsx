import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import * as Animatable from 'react-native-animatable'

// Import components
import Picture from '../picture/Picture'
import Button from '../button/Button'
import InputControl from '../input/InputControl'

// Import image
import logo from '../../../assets/images/logo.png'

// Import theme
import { Theme } from '../../constants/Theme'

const ToolBar = props => {
  const { navigate } = props.navigation
  const [isActiveSearch, setIsActiveSearch] = useState(false)
  const [search, setSearch] = useState('')

  return (
    <>
      <Animatable.View
        animation='fadeInDown'
        iterationCount={1}
        style={[styles.container, {
          borderBottomWidth: !isActiveSearch ? 0.2 : 0
        }]}
      >
        {!isActiveSearch && (
          <>
            <Button
              iconName='keyboard-backspace'
              iconSize={32}
              onPress={() => props.navigation.goBack()}
            />
            <View style={styles.containerImage}>
              <Picture
                source={logo}
                styles={styles.image}
              />
            </View>
            <View style={styles.containerContent}>
              {!isActiveSearch && (
                <Button
                  iconName='search'
                  iconSize={30}
                  onPress={() => setIsActiveSearch(true)}
                />
              )}
              <View style={{ paddingHorizontal: 4 }} />
              <Button
                iconName='location-off'
                iconSize={30}
                onPress={() => navigate('Address')}
              />
              <View style={{ paddingHorizontal: 4 }} />
              <View style={styles.containerNotification}>
                <Button
                  iconName='notifications-off'
                  iconSize={30}
                />
                <View style={styles.notification}>
                  <Text style={styles.notificationValue}>7</Text>
                </View>
              </View>
            </View>
          </>
        )}

        {isActiveSearch && (
          <Animatable.View
            animation='fadeInRight'
            iterationCount={1}
            style={styles.containerSearch}
          >
            <Button
              iconName='chevron-left'
              onPress={() => setIsActiveSearch(!isActiveSearch)}
            />
            <InputControl
              value={search}
              setValue={setSearch}
              placeholder='Buscar...'
              placeholderTextColor={Theme.COLORS.colorParagraphSecondary}
              onChangeText={value => setSearch(value)}
              isActiveButton
              isActiveIcon
              iconSize={28}
              iconColor={Theme.COLORS.colorSecondary}
              iconName='search'
              stylesInput={styles.stylesInput}
              stylesIcon={styles.icon}
              stylesContainer={{
                width: 270
              }}
            />
          </Animatable.View>
        )}
      </Animatable.View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: Theme.COLORS.colorMainAlt,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderBottomColor: Theme.COLORS.colorSecondary,
    borderRadius: 200,
    position: 'relative'
  },
  containerSearch: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  containerImage: {
    height: '100%'
  },
  containerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  containerNotification: {
    position: 'relative'
  },
  notification: {
    backgroundColor: 'red',
    position: 'absolute',
    right: -5,
    top: -3,
    borderRadius: 100,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4
  },
  notificationValue: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold'
  },
  image: {
    resizeMode: 'contain',
    width: 130,
    height: 40
  },
  stylesInput: {
    backgroundColor: Theme.COLORS.colorMainAlt,
    borderRadius: 100,
    paddingLeft: 55,
    paddingRight: 50,
    paddingVertical: 8,
    borderWidth: 0.3,
    borderColor: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    color: Theme.COLORS.colorParagraph,
    width: '100%'
  },
  icon: {
    position: 'absolute',
    top: 10,
    left: 18
  }
})

export default ToolBar
