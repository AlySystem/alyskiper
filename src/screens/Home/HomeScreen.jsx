import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions
} from 'react-native'
import { useSelector } from 'react-redux'

// Import image
import image from '../../../assets/images/img-code-invited.png'

// Import theme
import { Theme } from '../../constants/Theme'

// Import components
import Background from '../../components/background/Background'
import Picture from '../../components/picture/Picture'
import IconButton from '../../components/button/IconButton'
import Title from '../../components/title/Title'

const { height, width } = Dimensions.get('window')

const HomeScreen = props => {
  const userData = useSelector(state => state.user)
  console.log(userData)
  return (
    <Background>
      <View style={styles.screen}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps='always'
        >
          <View style={styles.layout} />
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
  scrollView: {
    flexGrow: 1
  },
  layout: {
    paddingHorizontal: 10,
    flex: 1
  }
})

export default HomeScreen
