import React from 'react'
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image
} from 'react-native'

// Import components
import { LazyImage } from '../lazy/LazyImage'

// Import theme
import { Theme } from '../../constants/Theme'
import { RFValue } from 'react-native-responsive-fontsize'

const DetailsDrive = props => {
  const drive = props.drive
  const { avatar, firstname, lastname } = drive.getTravelByUserId.skiperagent.user
  const { license_plate, vehicleModel, vehicleTrademark, uploadVehicleAppearance } = drive.getTravelByUserId.skiperagent.skiperVehicleAgent[0].skiperVehicle

  // console.log(imageVehicle)

  return (
    <ScrollView style={styles.container}>
      {/* <Text allowFontScaling={false} style={styles.title}>Informacion del conductor</Text> */}

      <View style={{ paddingVertical: 3 }} />
      <View style={styles.containerImage}>
        <LazyImage
          styleLazyImage={{
            width: RFValue(200),
            height: RFValue(200),
            resizeMode: 'cover',
            borderRadius: 200
          }}
          sourceLazy={require('../../../assets/images/img-lazy.png')}
          source={{ uri: avatar }}
          styleImage={{
            width: RFValue(200),
            height: RFValue(200),
            borderRadius: 200,
            resizeMode: 'cover',
          }}
        />
      </View>

      <Text allowFontScaling={false} style={styles.title}>{firstname} {lastname}</Text>

      <View style={{ paddingVertical: 3 }} />

      <View>
        {
          uploadVehicleAppearance !== null &&
          <Image
            style={{
              width: '100%',
              height: RFValue(250),
              resizeMode: 'cover',
              borderRadius: 5
            }}
            source={{ uri: uploadVehicleAppearance.url_img_vehicle_side_right }} />
        }

        <View style={{ marginVertical: RFValue(10) }} />

        <View style={styles.containerDetails}>
          <Text allowFontScaling={false} style={styles.key}>Placa:</Text>
          <Text allowFontScaling={false} style={styles.value}>{license_plate}</Text>
        </View>

        <View style={{ marginVertical: RFValue(10) }} />

        <View style={styles.containerDetails}>
          <Text allowFontScaling={false} style={styles.key}>Modelo:</Text>
          <Text allowFontScaling={false} style={styles.value}>{vehicleModel.name}</Text>
        </View>

        <View style={{ marginVertical: RFValue(10) }} />

        <View style={styles.containerDetails}>
          <Text allowFontScaling={false} style={styles.key}>Marca:</Text>
          <Text allowFontScaling={false} style={styles.value}>{vehicleTrademark.name}</Text>
        </View>

        <View style={{ marginVertical: RFValue(10) }} />

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 35
  },
  containerImage: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '5%',
  },
  title: {
    color: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
    marginBottom: 20,
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
    fontSize: RFValue(24),
    marginTop: 10,
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
