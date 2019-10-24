import React, { useEffect, useState } from 'react'
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native'
import { useQuery } from '@apollo/react-hooks'

// Import querys
import { COMMERCERS } from '../../graphql/querys/Querys'

// Import container
import ListOfPromotion from '../../containers/ListOfPromotion'
import ListOfCommerce from '../../containers/ListOfCommerce'
import ListOfCategory from '../../containers/ListOfCategory'
import ListOfSwiper from '../../containers/ListOfSwiper'

// Import skeleton
import Skeleton from '../../skeleton/SkeletonCommerce'

// Import components
import Background from '../../components/background/Background'
import ToolBar from '../../components/header/ToolBar'
import Error from '../../components/error/Error'
import IconButton from '../../components/button/IconButton'

// Import custom hooks
import { useLocation } from '../../hooks/useLocation'

// Import theme
import { Theme } from '../../constants/Theme'

const CommerceScreen = props => {
  const { navigate } = props.navigation
  const { region, error, isLoading } = useLocation()
  const { loading, data } = useQuery(COMMERCERS, { variables: { latitud: region.latitude, longitud: region.longitude } })

  if (error) {
    return (
      <Error
        title='Error de ubicacion'
        message='No hemos podido obtener tu ubicacion, asegurate de tener activado el GPS para ofrecerte una mejor experiencia.'
      >
        <View style={{ marginTop: 50 }}>
          <IconButton
            message='ACTIVAR GPS'
            stylesButton={styles.button}
            stylesMessage={styles.message}
            isActiveIcon
            iconName='location-on'
          />
          <View style={{ paddingVertical: 10 }} />
          <IconButton
            message='SACAME DE AQUI'
            stylesButton={styles.button}
            stylesMessage={styles.message}
            isActiveIcon
            iconName='reply'
            onPress={() => navigate('Home')}
          />
        </View>
      </Error>
    )
  }

  return (
    <Background>
      <View style={styles.screen}>
        <ToolBar
          navigation={props.navigation}
        />
        <ScrollView
          keyboardShouldPersistTaps='always'
        >
          {loading || isLoading ? (
            <Skeleton />
          ) : (
            <>
              <ListOfCategory />
              <View style={{ marginVertical: 20 }}>
                <ListOfSwiper />
              </View>
              <ListOfPromotion />
              <View style={{ paddingVertical: 10 }} />
              <ListOfCommerce
                navigation={props.navigation}
                data={data}
              />
            </>
          )}
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
  button: {
    backgroundColor: Theme.COLORS.colorMainAlt,
    borderRadius: 100,
    paddingHorizontal: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 210,
    borderColor: Theme.COLORS.colorSecondary,
    borderWidth: 0.5
  },
  message: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold',
    paddingLeft: 5,
    fontSize: Theme.SIZES.xsmall
  }
})

export default CommerceScreen
