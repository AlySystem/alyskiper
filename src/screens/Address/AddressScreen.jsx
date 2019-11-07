import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

// Import components
import Background from '../../components/background/Background'
import Title from '../../components/title/Title'
import FloatingActionButton from '../../components/button/FloatingActionButton'

// Import theme
import { Theme } from '../../constants/Theme'

// Import container
import ListOfAddress from '../../containers/ListOfAddress'

const AddressScreen = props => {
  const { navigate } = props.navigation

  return (
    <Background>
      <View style={styles.screen}>
        <View style={{
          paddingTop: 20,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        >
          <Title
            title='REGISTRA TUS DIRECCIONES'
            styles={{
              color: Theme.COLORS.colorParagraph,
              fontFamily: 'Lato-Bold',
              fontSize: Theme.SIZES.small
            }}
          />
        </View>
        <View style={{
          paddingHorizontal: 10
        }}
        >
          <ListOfAddress />
        </View>

        <FloatingActionButton
          stylesButton={{
            position: 'absolute',
            bottom: 15,
            right: 10,
            width: 60,
            height: 60,
            backgroundColor: Theme.COLORS.colorMain,
            borderRadius: 200,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: Theme.COLORS.colorSecondary,
            borderWidth: 0.2
          }}
          onPress={() => navigate('MapAddress')}
          iconName='add'
          iconSize={40}
        />
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'rgba(0,0,0,.5)',
    flex: 1
  }
})

export default AddressScreen
