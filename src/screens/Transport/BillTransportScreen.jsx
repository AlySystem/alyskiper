import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { useQuery } from '@apollo/react-hooks'
import { showMessage } from 'react-native-flash-message'

// Import components
import Background from '../../components/background/Background'
import IconButton from '../../components/button/IconButton'
import Loader from '../../components/loader/Loader'

// Import query
import { INVOICE } from '../../graphql/querys/Querys'

// Import theme
import { Theme } from '../../constants/Theme'

const BillTransportScreen = props => {
  const { navigate } = props.navigation
  const idTravel = props.navigation.getParam('idTravel')
  console.log(idTravel)

  const { loading, error, data } = useQuery(INVOICE, { variables: { idservice: idTravel } })

  if (error) {
    showMessage({
      message: 'Error',
      description: 'Oh no, ocurrio un error. No hemos podido mostrar la factura',
      backgroundColor: 'red',
      color: '#fff',
      icon: 'danger',
      titleStyle: {
        fontFamily: 'Lato-Bold'
      },
      textStyle: {
        fontFamily: 'Lato-Regular'
      }
    })
    navigate('Home')
  }

  if (loading) {
    return (
      <View style={{
        flex: 1,
        backgroundColor: Theme.COLORS.colorMainAlt,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      >
        <Text style={{
          color: Theme.COLORS.colorParagraph,
          fontFamily: 'Lato-Regular',
          fontSize: Theme.SIZES.small
        }}
        >Cargando factura...
        </Text>
        <View style={{ marginVertical: 5 }} />
        <Loader />
      </View>
    )
  }

  const handleOnConfirm = () => {
    return navigate('Home', { remove: true })
  }

  return (
    <Background>
      <View style={styles.screen}>
        <View style={styles.layout}>
          <View style={styles.container}>
            <View style={styles.itemAlt}>
              <Text allowFontScaling={false} style={styles.text}>DURACION</Text>
              <Text allowFontScaling={false} style={styles.value}>{data.getInvoinceByIdservice.anyservice.duration}</Text>
            </View>
            <View style={styles.item}>
              <Text allowFontScaling={false} style={styles.text}>DISTANCIA</Text>
              <Text allowFontScaling={false} style={styles.value}>{data.getInvoinceByIdservice.anyservice.distance}</Text>
            </View>
          </View>

          <View style={styles.containerAddress}>
            <Text allowFontScaling={false} style={styles.text}>ORIGEN</Text>
            <Text allowFontScaling={false} style={styles.textAddress}>{data.getInvoinceByIdservice.anyservice.address_initial}</Text>
          </View>

          <View style={styles.containerAddress}>
            <Text allowFontScaling={false} style={styles.text}>DESTINO</Text>
            <Text allowFontScaling={false} style={styles.textAddress}>{data.getInvoinceByIdservice.anyservice.address_final}</Text>
          </View>

          <View style={styles.container}>
            <Text allowFontScaling={false} style={styles.text}>CATEGORIA</Text>
            <Text allowFontScaling={false} style={styles.textCategory}>SILVER</Text>
          </View>

          <View style={styles.container}>
            <Text allowFontScaling={false} style={styles.text}>TOTAL</Text>
            <Text allowFontScaling={false} style={styles.textValue}>{data.getInvoinceByIdservice.anyservice.total}</Text>
          </View>
        </View>
        <View style={{
          width: '100%',
          alignItems: 'center'
        }}
        >
          <IconButton
            message='CONFIRMAR'
            isActiveIcon
            onPress={handleOnConfirm}
          />
        </View>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'rgba(0,0,0,.5)',
    flex: 1
  },
  layout: {
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  containerAddress: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  textAddress: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    paddingVertical: 5
  },
  item: {
    flexGrow: 1,
    borderLeftColor: Theme.COLORS.colorSecondary,
    borderLeftWidth: 1,
    alignItems: 'flex-end'
  },
  itemAlt: {
    flexGrow: 1
  },
  text: {
    fontFamily: 'Lato-Regular',
    color: Theme.COLORS.colorSecondary,
    fontSize: Theme.SIZES.small,
    marginVertical: 3
  },
  value: {
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.small
  },
  textCategory: {
    textTransform: 'uppercase',
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.normal,
    color: Theme.COLORS.colorSecondary
  },
  textValue: {
    color: Theme.COLORS.colorSecondary,
    fontSize: Theme.SIZES.title
  }
})

export default BillTransportScreen
