import React from 'react'
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native'

// Import container
import ListOfCategory from '../../containers/ListOfCategory'
import ListOfPromotion from '../../containers/ListOfPromotion'
import ListOfCommerce from '../../containers/ListOfCommerce'

// Import components
import Background from '../../components/background/Background'

const CommerceScreen = props => {
  return (
    <Background>
      <View style={styles.screen}>
        <ScrollView
          keyboardShouldPersistTaps='always'
        >
          <ListOfCategory />
          <ListOfPromotion />
          <View style={{ paddingVertical: 10 }} />
          <ListOfCommerce navigation={props.navigation} />
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
