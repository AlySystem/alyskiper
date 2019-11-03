import React from 'react'
import {
  View,
  StyleSheet,
  Text
} from 'react-native'

// Import components
import { LazyImage } from '../lazy/LazyImage'

// Import theme
import { Theme } from '../../constants/Theme'

const DetailsDrive = props => {
  const drive = props.drive
  console.log(drive)
  // const { avatar, firstname, lastname } = drive.skiperagent.user

  return (
    <View style={styles.container}>
      <Text allowFontScaling={false} style={styles.title}>Informacion del conductor</Text>

      {/* <View style={{ paddingVertical: 3 }} />
      <View style={styles.containerImage}>
        <LazyImage
          styleLazyImage={{
            width: 85,
            height: 85,
            resizeMode: 'cover',
            borderRadius: 200
          }}
          sourceLazy={require('../../../assets/images/img-lazy.png')}
          source={{ uri: avatar }}
          styleImage={{
            width: 85,
            height: 85,
            borderRadius: 200,
            resizeMode: 'cover',
            borderColor: Theme.COLORS.colorSecondary,
            borderWidth: 1
          }}
        />
        <View style={styles.containerDetails}>
          <Text allowFontScaling={false} style={styles.key}>Nombre:</Text>
          <Text allowFontScaling={false} style={styles.value}>{firstname} {lastname}</Text>
        </View>
      </View>

      <View style={{ paddingVertical: 3 }} /> */}

      <Text allowFontScaling={false} style={styles.title}>Informacion del vehiculo</Text>
      {/*
      <View>
        <View style={styles.containerDetails}>
          <Text allowFontScaling={false} style={styles.key}>Placa:</Text>
          <Text allowFontScaling={false} style={styles.value}>{}</Text>
        </View>

        <View style={{ paddingVertical: 5 }} />
        <View style={styles.containerDetails}>
          <Text allowFontScaling={false} style={styles.key}>Modelo:</Text>
          <Text allowFontScaling={false} style={styles.value}>{}</Text>
        </View>

        <View style={{ paddingVertical: 5 }} />
        <View style={styles.containerDetails}>
          <Text allowFontScaling={false} style={styles.key}>Color:</Text>
          <Text allowFontScaling={false} style={styles.value}>{}</Text>
        </View>

      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  containerImage: {
    flexDirection: 'row'
  },
  title: {
    color: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.subTitle
  },
  key: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.normal
  },
  value: {
    color: Theme.COLORS.colorParagraphSecondary,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small
  },
  containerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})

export default DetailsDrive
