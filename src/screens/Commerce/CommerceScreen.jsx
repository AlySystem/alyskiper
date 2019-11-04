import React, { useState } from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native'

// Import container
import ListOfPromotion from '../../containers/ListOfPromotion'
import ListOfCommerce from '../../containers/ListOfCommerce'
import ListOfCategory from '../../containers/ListOfCategory'
import ListOfSwiper from '../../containers/ListOfSwiper'
import ListOfFavorite from '../../containers/ListOfFavorite'

// Import components
import Background from '../../components/background/Background'
import ToolBar from '../../components/header/ToolBar'
import DropDown from '../../components/dropdown/DropDown'

// Import theme
import { Theme } from '../../constants/Theme'

const CommerceScreen = props => {
  const [categoryId, setCategoryId] = useState(0)
  const [dropDown, setDropDown] = useState(false)

  const handleOnPress = (categoryId) => {
    setCategoryId(categoryId)
  }

  return (
    <Background>
      <View style={styles.screen}>
        <ToolBar
          navigation={props.navigation}
          setDropDown={setDropDown}
          dropDown={dropDown}
        />
        <ScrollView
          keyboardShouldPersistTaps='always'
        >
          <ListOfCategory
            handleOnPress={handleOnPress}
          />
          {!categoryId && (
            <>
              <View style={{ marginVertical: 20 }}>
                <ListOfSwiper />
              </View>
              <ListOfPromotion />
            </>
          )}
          <ListOfFavorite />
          <View style={{ paddingVertical: 10 }} />
          <ListOfCommerce
            categoryId={categoryId}
            navigation={props.navigation}
          />
        </ScrollView>
        {dropDown && (
          <DropDown>
            <TouchableOpacity>
              <Text allowFontScaling={false} style={styles.textItem}>Agregar direcciones</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text allowFontScaling={false} style={styles.textItem}>Buscar</Text>
            </TouchableOpacity>
          </DropDown>
        )}
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
    position: 'relative'
  },
  textItem: {
    fontFamily: 'Lato-Regular',
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.small,
    paddingVertical: 15
  }
})

export default CommerceScreen
