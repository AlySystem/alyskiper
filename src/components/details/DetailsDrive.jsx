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
  const { avatar, firstname, lastname } = drive.getTravelByUserId.skiperagent.user
  const { license_plate, vehicleModel, vehicleTrademark } = drive.getTravelByUserId.skiperagent.skiperVehicleAgent[0].skiperVehicle

  return (
    <View style={styles.container}>
      <Text allowFontScaling={false} style={styles.title}>Informacion del conductor</Text>

      <View style={{ paddingVertical: 3 }} />
      <View style={styles.containerImage}>
        <LazyImage
          styleLazyImage={{
            width: 70,
            height: 70,
            resizeMode: 'cover',
            borderRadius: 200
          }}
          sourceLazy={require('../../../assets/images/img-lazy.png')}
          source={{ uri: avatar }}
          styleImage={{
            width: 70,
            height: 70,
            borderRadius: 200,
            resizeMode: 'cover',
            borderColor: Theme.COLORS.colorSecondary,
            borderWidth: 1
          }}
        />
        <View style={styles.containerDetails}>
          <Text allowFontScaling={false} style={styles.keyAlt}>Nombre:</Text>
          <Text allowFontScaling={false} style={styles.valueAlt}>{firstname} {lastname}</Text>
        </View>
      </View>

      <View style={{ paddingVertical: 3 }} />

      <Text allowFontScaling={false} style={styles.title}>Informacion del vehiculo</Text>

      <View>
        <View style={styles.containerDetails}>
          <Text allowFontScaling={false} style={styles.key}>Placa:</Text>
          <Text allowFontScaling={false} style={styles.value}>{license_plate}</Text>
        </View>

        <View style={{ paddingVertical: 5 }} />
        <View style={styles.containerDetails}>
          <Text allowFontScaling={false} style={styles.key}>Modelo:</Text>
          <Text allowFontScaling={false} style={styles.value}>{vehicleModel.name}</Text>
        </View>

        <View style={{ paddingVertical: 5 }} />
        <View style={styles.containerDetails}>
          <Text allowFontScaling={false} style={styles.key}>Marca:</Text>
          <Text allowFontScaling={false} style={styles.value}>{vehicleTrademark.name}</Text>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 35
  },
  containerImage: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
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
  keyAlt: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.normal,
    marginLeft: 15
  },
  valueAlt: {
    color: Theme.COLORS.colorParagraphSecondary,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    marginLeft: 15
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
