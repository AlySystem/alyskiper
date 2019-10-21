import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  StatusBar,
  Image
} from 'react-native'
import { useSelector } from 'react-redux'
import MaskedView from '@react-native-community/masked-view'

// Import theme
import { Theme } from '../../constants/Theme'

// Import components
import Background from '../../components/background/Background'

class HomeScreen extends React.Component {
  state = {
    loadingProgress: new Animated.Value(0),
    animationDone: false,
  }

  componentDidMount() {
    setInterval(() => {
      Animated.timing(this.state.loadingProgress, {
        toValue: 100,
        duration: 1500,
        useNativeDriver: true, // This is important!
      }).start();
    }, 1000);
  }

  render() {
    const loadingProgress = this.state.loadingProgress;
    const opacityClearToVisible = {
      opacity: loadingProgress.interpolate({
        inputRange: [0, 15, 30],
        outputRange: [0, 0, 1],
        extrapolate: 'clamp'
      }),
    };

    const imageScale = {
      transform: [
        {
          scale: loadingProgress.interpolate({
            inputRange: [0, 10, 100],
            outputRange: [1, 0.8, 70],
          }),
        },
      ],
    };

    const appScale = {
      transform: [
        {
          scale: loadingProgress.interpolate({
            inputRange: [0, 100],
            outputRange: [1.1, 1],
          }),
        },
      ],
    };

    const fullScreenBlueLayer = <View style={styles.fullScreenBlueLayer} />;
    const fullScreenWhiteLayer = <View style={styles.fullScreenWhiteLayer} />;

    return (
       <View style={styles.fullScreen}>
        {fullScreenBlueLayer}
        <MaskedView
          style={{flex: 1}}
          maskElement={
            <View style={styles.centeredFullScreen}>
              <Animated.Image
                style={[styles.maskImageStyle, imageScale]}
                source={require('../../../assets/images/img-alyskiper-loader.png')}
              />
            </View>
          }>
          {fullScreenWhiteLayer}
          <Animated.View style={[opacityClearToVisible, appScale, {flex: 1}]}>
            <Background>
              <View style={styles.screen}>
                <ScrollView
                  keyboardShouldPersistTaps='always'
                ></ScrollView>
              </View>
            </Background>
          </Animated.View>
        </MaskedView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  centeredFullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.COLORS.colorMainAlt
  },
  maskImageStyle: {
    height: 200,
    width: 200,
  },
  fullScreenWhiteLayer: {
    backgroundColor: Theme.COLORS.colorMainAlt,
  },
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)'
  }
})

export default HomeScreen
