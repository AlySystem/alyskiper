import React, { useState } from 'react'
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native'

// Import container
// import ListOfPromotion from '../../containers/ListOfPromotion'
import ListOfCommerce from '../../containers/ListOfCommerce'
import ListOfCategory from '../../containers/ListOfCategory'
import ListOfSwiper from '../../containers/ListOfSwiper'

// Import components
import Background from '../../components/background/Background'
import ToolBar from '../../components/header/ToolBar'

const CommerceScreen = props => {
  const [categoryId, setCategoryId] = useState(0)

  const handleOnPress = (categoryId) => {
    setCategoryId(categoryId)
  }

  return (
    <Background>
      <View style={styles.screen}>
        <ToolBar
          navigation={props.navigation}
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
              {/* <ListOfPromotion /> */}
            </>
          )}
          <View style={{ paddingVertical: 10 }} />
          <ListOfCommerce
            categoryId={categoryId}
            navigation={props.navigation}
          />
        </ScrollView>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)'
  }
})

export default CommerceScreen
