import React, { useEffect, useState } from 'react'
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native'

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

// Import custom hooks
import { useLocation } from '../../hooks/useLocation'

const CommerceScreen = props => {
  const { region, error } = useLocation()

  return (
    <Background>
      <View style={styles.screen}>
        <ToolBar
          navigation={props.navigation}
        />
        <ScrollView
          keyboardShouldPersistTaps='always'
        >
          <Skeleton />
          <ListOfCategory />
          <View style={{ marginVertical: 20 }}>
            <ListOfSwiper />
          </View>
          <ListOfPromotion />
          <View style={{ paddingVertical: 10 }} />
          <ListOfCommerce
            navigation={props.navigation}
            region={region}
          />
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
