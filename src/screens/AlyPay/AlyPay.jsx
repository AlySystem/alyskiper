import React, { useState } from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator
} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

// Import data Redux
import { useDispatch } from 'react-redux'
import { SETCRYPTO } from '../../store/actionTypes'

// Import Graphql
import { useQuery } from '@apollo/react-hooks'
import { GetCryptos } from '../../graphql/querys/Querys'

// Import components
import Background from '../../components/background/Background'
import { showMessage } from 'react-native-flash-message'

// Import Assets
import ImageBackground from '../../../assets/images/background-alymoney.png'
import ImageAlyPay from '../../../assets/images/alypay.png'

// Import containers
import ItemCommission from '../../components/item/ItemCommission'
import PinAuth from './AuthPin'



const AlyPay = (props) => {
  const dispatch = useDispatch()

  const { loading, data } = useQuery(GetCryptos, {
    onError: () => {
      showMessage({
        message: 'Skiper',
        description: `Su pin de seguridad ha sido enviado correctamente a ${email}`,
        backgroundColor: '#c0392b',
        color: '#fff',
        icon: 'danger'
      })
    }
  })

  return (
    <Background source={ImageBackground}>
      <PinAuth />

      <View style={styles.screen}>
        <ScrollView keyboardShouldPersistTaps='always'>
          <Image style={styles.imageAly} source={ImageAlyPay} />

          {
            loading &&
            <ActivityIndicator color="#FFF" size="large" style={{ alignContent: 'center' }} />
          }

          <View style={styles.layout}>
            {
              (data && !loading) &&
              data.Cryptocurrency.map((item, key) => (
                <ItemCommission
                  onPress={() => {
                    dispatch({
                      type: SETCRYPTO,
                      payload: item
                    })

                    props.navigation.navigate('DetailsCrypto')
                  }}
                  key={key}
                  name={item.name}
                  symbol={item.iso}
                  picture={item.url_img}
                />
              ))
            }
          </View>
        </ScrollView>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.4)'
  },
  layout: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  imageAly: {
    alignSelf: 'center',
    height: RFValue(100),
    resizeMode: 'contain',
    width: RFValue(180),
  }
})

export default AlyPay
