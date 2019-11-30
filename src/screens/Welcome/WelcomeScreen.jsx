import React from 'react'
import {
  View,
  StyleSheet,
  Dimensions
} from 'react-native'
// import LottieView from 'lottie-react-native'
import * as Animatable from 'react-native-animatable'

// Import components
import Background from '../../components/background/Background'
import IconButton from '../../components/button/IconButton'

// Import containers
import ListOfData from '../../containers/ListOfData'

// Import theme
import { Theme } from '../../constants/Theme'

const DIMENSIONS = 32

const snow = {
  one: require('./image/one.png'),
  two: require('./image/two.png'),
  three: require('./image/three.png'),
  four: require('./image/four.png'),
}

count = 15

const Swinging = ({
  amplitude,
  rotation = 7,
  delay,
  duration = 700,
  children,
}) => (
    <Animatable.View
      animation={{
        0: {
          translateX: -amplitude,
          translateY: -amplitude * 0.8,
          rotate: `${rotation}deg`,
        },
        0.5: {
          translateX: 0,
          translateY: 0,
          rotate: '0deg',
        },
        1: {
          translateX: amplitude,
          translateY: -amplitude * 0.8,
          rotate: `${-rotation}deg`,
        },
      }}
      delay={delay}
      duration={duration}
      direction="alternate"
      easing="ease-in-out"
      style={{ width: '120%' }}
      iterationCount="infinite"
      useNativeDriver>
      {children}
    </Animatable.View>
  );

const FlippingImage = ({
  delay,
  duration = 1000,
  source,
}) => {
  const size = randomSize()

  return (
    <Animatable.Image
      duration={duration}
      delay={delay}
      easing="linear"
      iterationCount="infinite"
      useNativeDriver
      source={source}
      style={{
        height: size,
        backfaceVisibility: 'hidden',
        width: size,
      }}
    />
  )
};

const randomize = max => Math.random() * max;
const MONEY_DIMENSIONS = { width: 49, height: 26 };
const SCREEN_DIMENSIONS = Dimensions.get('window');
const WIGGLE_ROOM = 100;

const duration = 15000

const randomSize = () => {
  const sizes = [14, 24, 32]

  return sizes[Math.floor(Math.random() * sizes.length)]
}

const range = count => {
  const array = [];
  for (let i = 0; i < count; i++) {
    array.push(i);
  }
  return array;
};

const Falling = ({ duration, delay, style, children }) => (
  <Animatable.View
    animation={{
      from: { translateY: -MONEY_DIMENSIONS.height - WIGGLE_ROOM },
      to: { translateY: SCREEN_DIMENSIONS.height + WIGGLE_ROOM },
    }}
    duration={duration}
    delay={delay}
    easing={t => Math.pow(t, 1.7)}
    iterationCount="infinite"
    useNativeDriver
    style={style}>
    {children}
  </Animatable.View>
);

const WelcomeScreen = props => {
  const { navigate } = props.navigation

  return (
    <Background>

      {
        range(count)
          .map(i => randomize(500))
          .map((flipDelay, i) => (
            <React.Fragment key={i}>
              <Falling
                key={i}
                duration={duration}
                delay={i * (duration / count)}
                style={{
                  position: 'absolute',
                  paddingHorizontal: WIGGLE_ROOM,
                  left:
                    randomize(SCREEN_DIMENSIONS.width - randomSize()) -
                    WIGGLE_ROOM,
                }}>
                <Swinging
                  amplitude={randomSize() / 4}
                  delay={randomize(duration)}>
                  <FlippingImage source={snow.one} delay={flipDelay} />
                </Swinging>
              </Falling>
              <Falling
                key={i}
                duration={duration}
                delay={i * (duration / count)}
                style={{
                  position: 'absolute',
                  paddingHorizontal: WIGGLE_ROOM,
                  left:
                    randomize(SCREEN_DIMENSIONS.width - randomSize()) -
                    WIGGLE_ROOM,
                }}>
                <Swinging
                  amplitude={randomSize() / 4}
                  delay={randomize(duration)}>
                  <FlippingImage source={snow.two} delay={flipDelay} />
                </Swinging>
              </Falling>

              <Falling
                key={i}
                duration={duration}
                delay={i * (duration / count)}
                style={{
                  position: 'absolute',
                  paddingHorizontal: WIGGLE_ROOM,
                  left:
                    randomize(SCREEN_DIMENSIONS.width - randomSize()) -
                    WIGGLE_ROOM,
                }}>
                <Swinging
                  amplitude={MONEY_DIMENSIONS.width / 4}
                  delay={randomize(duration)}>
                  <FlippingImage source={snow.three} delay={flipDelay} />
                </Swinging>
              </Falling>
            </React.Fragment>
          ))
      }


      <View style={styles.screen}>
        <View style={styles.container}>
          <ListOfData />
          <View style={styles.containerButtons}>
            <IconButton
              message='INICIAR SESION'
              isActiveIcon
              stylesButton={styles.buttonAlt}
              iconName='person'
              onPress={() => navigate('SignIn')}
            />
            <IconButton
              message='REGISTRARSE'
              isActiveIcon
              stylesButton={styles.button}
              iconName='person-add'
              onPress={() => navigate('SignUp')}
            />
          </View>
        </View>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerButtons: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row'
  },
  button: {
    paddingHorizontal: 20,
    height: 57,
    backgroundColor: Theme.COLORS.colorMainAlt,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '50%',
    borderBottomColor: Theme.COLORS.colorSecondary,
    borderBottomWidth: 0.3
  },
  buttonAlt: {
    paddingHorizontal: 20,
    height: 57,
    backgroundColor: Theme.COLORS.colorMainAlt,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '50%',
    borderBottomColor: Theme.COLORS.colorSecondary,
    borderBottomWidth: 0.3,
    borderRightColor: Theme.COLORS.colorSecondary,
    borderRightWidth: 0.3
  }
})

export default WelcomeScreen
