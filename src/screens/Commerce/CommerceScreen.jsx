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
import Loader from '../../components/loader/Loader'

// Import custom hooks
import { useLocation } from '../../hooks/useLocation'

// Import theme
import { Theme } from '../../constants/Theme'

const CommerceScreen = props => {
  const { navigate } = props.navigation
  // const { region, errorRegion, isLoading } = useLocation()
  // const { loading, data } = useQuery(COMMERCERS, { variables: { latitud: region.latitude, longitud: region.longitude } })

  // if (isLoading) return <Skeleton />
  // if (errorRegion) return navigate('Error', { title: 'Error de ubicacion', message: 'No hemos podido obtener tu ubicacion, asegurate de tener activado el GPS para ofrecerte una mejor experiencia.' })

  return (
    <Background>
      <View style={styles.screen}>
        <ToolBar
          navigation={props.navigation}
        />
        <ScrollView
          keyboardShouldPersistTaps='always'
        >
          <ListOfCategory />
          <View style={{ marginVertical: 20 }}>
            <ListOfSwiper />
          </View>
          <ListOfPromotion />
          <View style={{ paddingVertical: 10 }} />
          {/* <ListOfCommerce
            navigation={props.navigation}
            data={data}
          /> */}
        </ScrollView>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)'
  }
})

export default CommerceScreen
