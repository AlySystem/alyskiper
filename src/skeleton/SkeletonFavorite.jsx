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

const SkeletonFavorite = props => {
  return (
    <View style={styles.container}>
      <Placeholder
        Animation={Fade}
        duration={900}
      >
        <View style={{ flexDirection: 'row' }}>
          <PlaceholderMedia
            style={{
              borderRadius: 100,
              height: 40,
              width: 40,
              backgroundColor: Theme.COLORS.colorSecondary
            }}
          />
          <View style={{ paddingHorizontal: 5 }} />
          <View style={{ height: '100%', width: '100%' }}>
            <PlaceholderLine
              width={30}
              height={10}
              style={{
                backgroundColor: Theme.COLORS.colorSecondary
              }}
            />
            <PlaceholderLine
              width={20}
              height={8}
              style={{
                backgroundColor: Theme.COLORS.colorSecondary
              }}
            />
          </View>
        </View>

        <View style={{ paddingVertical: 6 }} />
        <PlaceholderMedia
          style={{
            width: 220,
            height: 120,
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
    paddingHorizontal: 10
  }
})

export default SkeletonFavorite
