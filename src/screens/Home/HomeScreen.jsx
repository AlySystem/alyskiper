import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions
} from 'react-native'
import { ApolloConsumer } from '@apollo/react-hooks'
import Share from 'react-native-share'
import Hashids from 'hashids'

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
  const hashids = new Hashids()

  const handleOnShare = async (id, phone) => {
    await Share.open({
      title: 'Comparte tu codigo',
      message: `Hola, utiliza mi código *${id}* para poder ganar con Skiper`,
      url: '',
      filename: 'test',
      whatsAppNumber: phone
    })
  }

  return (
    <ApolloConsumer>
      {client => (
        <Background>
          <View style={styles.screen}>
            <ScrollView
              contentContainerStyle={styles.scrollView}
              keyboardShouldPersistTaps='always'
            >
              <View style={styles.layout}>
                <Title
                  title='Invitar amigos'
                  styles={styles.title}
                />
                <View style={{ paddingVertical: 5 }} />
                <Text style={styles.description}>Comparte tu codigo con tus amigos y podras ganar Alytochis y Satochis cuando tu y tus amigos utilicen la aplicacion.</Text>
                <View style={styles.container}>
                  <Text style={styles.codeInvited}>
                    {hashids.encode(client.cache.data.data.ROOT_QUERY.userId)}
                  </Text>
                  <View style={{ paddingVertical: 3 }} />
                  <Picture
                    source={image}
                    styles={styles.image}
                  />
                  <View style={{ paddingVertical: 8 }} />
                  <IconButton
                    message='COMPARTIR'
                    isActiveIcon
                    iconName='share'
                    onPress={() => handleOnShare(hashids.encode(client.cache.data.data.ROOT_QUERY.userId), client.cache.data.data.ROOT_QUERY.phoneNumber)}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </Background>
      )}
    </ApolloConsumer>
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
  },
  description: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    textAlign: 'center'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  image: {
    resizeMode: 'contain',
    height: height * 0.3,
    width: width * 0.8
  },
  title: {
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.subTitle,
    color: Theme.COLORS.colorParagraph
  },
  codeInvited: {
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.title,
    color: Theme.COLORS.colorSecondary,
    transform: [{ rotate: '-8deg' }]
  }
})

export default HomeScreen
