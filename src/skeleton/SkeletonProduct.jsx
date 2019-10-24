import React from 'react'
import {
  View
} from 'react-native'

import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from 'rn-placeholder'

// Import theme
import { Theme } from '../constants/Theme'

const SkeletonProduct = props => {
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <Placeholder
        Animation={Fade}
        duration={900}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <PlaceholderMedia
            style={{
              borderRadius: 100,
              height: 60,
              width: 60,
              backgroundColor: Theme.COLORS.colorSecondary
            }}
          />
          <View style={{ width: '100%', paddingLeft: 10 }}>
            <PlaceholderLine
              width={60}
              style={{
                backgroundColor: Theme.COLORS.colorSecondary
              }}
            />
            <PlaceholderLine
              width={30}
              style={{
                backgroundColor: Theme.COLORS.colorSecondary
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
      </Placeholder>
    </View>
  )
}

export default SkeletonProduct
