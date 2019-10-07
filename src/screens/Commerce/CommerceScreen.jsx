import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

// Import container
import ListOfCategory from '../../containers/ListOfCategory'
import ListOfPromotion from '../../containers/ListOfPromotion'

// Import components
import Background from '../../components/background/Background'

const CommerceScreen = props => {
  return (
    <Background>
      <View style={styles.screen}>
        <ListOfCategory />
        <ListOfPromotion />
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
