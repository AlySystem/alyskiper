import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

// Import components
import Background from '../../components/background/Background'
import Banner from '../../components/banner/Banner'

// Import theme
import { Theme } from '../../constants/Theme'

const ProfileCommerceScreen = props => {
  return (
    <Background>
      <View style={styles.screen}>
        <Banner
          sourceLogo={{ uri: 'https://pbs.twimg.com/profile_images/666277106368671744/C9ITGHyB_400x400.png' }}
          sourceImage={{ uri: 'https://userscontent2.emaze.com/images/50a47c7f-0ab5-4038-af60-a822eec00dd8/652296452549ce574b272fcd57c1fcfc.jpg' }}
        />
        <View style={{ paddingVertical: 8 }} />
        <View style={styles.containerTitle}>
          <Text style={styles.name}>McDonals</Text>
          <Text style={styles.description}>Hamburguesas - postres</Text>
        </View>
        <View style={styles.containerHour}>
          <Text style={styles.hourTitle}>Horarios</Text>
          <Text style={styles.hour}>11:00 am / 6:00 pm</Text>
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
  containerTitle: {
    paddingHorizontal: 10
  },
  name: {
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.title,
    fontFamily: 'Lato-Bold'
  },
  description: {
    color: Theme.COLORS.colorParagraphSecondary,
    fontSize: Theme.SIZES.small,
    fontFamily: 'Lato-Regular'
  }
})

export default ProfileCommerceScreen
