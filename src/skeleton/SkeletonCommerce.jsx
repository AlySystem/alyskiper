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

const SkeletonCommerce = props => {
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
            backgroundColor: Theme.COLORS.colorSecondary,
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
                backgroundColor: Theme.COLORS.colorSecondary
              }}
            />
            <PlaceholderLine
              width={100}
              height={10}
              style={{
                marginVertical: 10,
                backgroundColor: Theme.COLORS.colorSecondary,
                borderRadius: 100
              }}
            />
          </View>
          <View style={styles.category}>
            <PlaceholderMedia
              style={{
                borderRadius: 100,
                height: 80,
                width: 80,
                backgroundColor: Theme.COLORS.colorSecondary
              }}
            />
            <PlaceholderLine
              width={100}
              height={10}
              style={{
                marginVertical: 10,
                backgroundColor: Theme.COLORS.colorSecondary,
                borderRadius: 100
              }}
            />
          </View>
          <View style={styles.category}>
            <PlaceholderMedia
              style={{
                borderRadius: 100,
                height: 80,
                width: 80,
                backgroundColor: Theme.COLORS.colorSecondary
              }}
            />
            <PlaceholderLine
              width={100}
              height={10}
              style={{
                marginVertical: 10,
                backgroundColor: Theme.COLORS.colorSecondary,
                borderRadius: 100
              }}
            />
          </View>
        </View>
        <View style={{ paddingVertical: 6 }} />
        <PlaceholderMedia
          style={{
            width: '100%',
            height: 200,
            backgroundColor: Theme.COLORS.colorSecondary,
            borderRadius: 10
          }}
        />
        <View style={{ paddingVertical: 10 }} />
        <PlaceholderLine
          width={40}
          height={18}
          style={{
            backgroundColor: Theme.COLORS.colorSecondary,
            borderRadius: 100
          }}
        />
        <PlaceholderMedia
          style={{
            width: 220,
            height: 130,
            backgroundColor: Theme.COLORS.colorSecondary,
            borderRadius: 10
          }}
        />
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
  },
  category: {

  }
})

export default SkeletonCommerce
