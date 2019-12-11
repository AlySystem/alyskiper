import React from 'react'
import { Dimensions  } from 'react-native'
import * as Animatable from 'react-native-animatable'

const randomize = max => Math.random() * max;
const OBJECT_DIMENSIONS = { width: 49, height: 26 };
const SCREEN_DIMENSIONS = Dimensions.get('window');
const WIGGLE_ROOM = 100;

const duration = 15000
const snow = {
    one: require('../../../assets/images/snow/one.png'),
    two: require('../../../assets/images/snow/two.png'),
    three: require('../../../assets/images/snow/three.png'),
    four: require('../../../assets/images/snow/four.png'),
}

count = 15

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

const Falling = ({ duration, delay, style, children }) => (
    <Animatable.View
        animation={{
            from: { translateY: -OBJECT_DIMENSIONS.height - WIGGLE_ROOM },
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

const Snow = () => (
    <React.Fragment>
        {
            range(count)
                .map(i => randomize(500))
                .map((flipDelay, i) => (
                    <React.Fragment key={i}>
                        <Falling
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
                                amplitude={OBJECT_DIMENSIONS.width / 4}
                                delay={randomize(duration)}>
                                <FlippingImage source={snow.three} delay={flipDelay} />
                            </Swinging>
                        </Falling>
                    </React.Fragment>
                ))
        }
    </React.Fragment>
)

export default Snow
