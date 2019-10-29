import React from 'react'
import {
  View,
  StyleSheet
} from 'react-native'

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from 'rn-placeholder'

// Import theme
import { Theme } from '../constants/Theme'

const SkeletonCategory = props => {
  return (
    <View style={styles.container}>
      <Placeholder
        Animation={Fade}
        duration={900}
      >
        <PlaceholderLine
          width={40}
          height={18}
          style={{
            backgroundColor: Theme.COLORS.colorSecondaryAlt,
            borderRadius: 100
          }}
        />
        <View style={styles.containerCategory}>
          <View>
            <PlaceholderMedia
              style={{
                borderRadius: 100,
                height: 80,
                width: 80,
                backgroundColor: Theme.COLORS.colorSecondaryAlt
              }}
            />
            <PlaceholderLine
              width={100}
              height={10}
              style={{
                marginVertical: 10,
                backgroundColor: Theme.COLORS.colorSecondaryAlt,
                borderRadius: 100
              }}
            />
          </View>
          <View>
            <PlaceholderMedia
              style={{
                borderRadius: 100,
                height: 80,
                width: 80,
                backgroundColor: Theme.COLORS.colorSecondaryAlt
              }}
            />
            <PlaceholderLine
              width={100}
              height={10}
              style={{
                marginVertical: 10,
                backgroundColor: Theme.COLORS.colorSecondaryAlt,
                borderRadius: 100
              }}
            />
          </View>
          <View>
            <PlaceholderMedia
              style={{
                borderRadius: 100,
                height: 80,
                width: 80,
                backgroundColor: Theme.COLORS.colorSecondaryAlt
              }}
            />
            <PlaceholderLine
              width={100}
              height={10}
              style={{
                marginVertical: 10,
                backgroundColor: Theme.COLORS.colorSecondaryAlt,
                borderRadius: 100
              }}
            />
          </View>
        </View>
      </Placeholder>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  containerCategory: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export default SkeletonCategory
