import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

import {
  Placeholder,
  PlaceholderLine,
  Fade
} from 'rn-placeholder'

// Import theme
import { Theme } from '../constants/Theme'

const SkeletonServices = props => {
  return (
    <View style={styles.container}>
      <Placeholder
        Animation={Fade}
        duration={900}
      >
        <PlaceholderLine
          width={70}
          height={18}
          style={{
            backgroundColor: Theme.COLORS.colorSecondaryAlt,
            borderRadius: 100
          }}
        />

        <View style={styles.containerImage}>
          <PlaceholderLine
            width={80}
            height={90}
            style={{
              borderRadius: 10,
              backgroundColor: Theme.COLORS.colorSecondaryAlt
            }}
          />
        </View>
      </Placeholder>
    </View>
  )
}

const styles = StyleSheet.create({
  containerImage: {
    width: '100%',
    justifyContent: 'center'
  }
})

export default SkeletonServices
