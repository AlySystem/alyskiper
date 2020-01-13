import React from 'react'
import {
  View
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
    <Placeholder Animation={Fade} duration={900} >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <PlaceholderLine style={{ borderRadius: 15, width: 55, height: 55, backgroundColor: Theme.COLORS.colorSecondaryAlt }} />
        <View style={{ marginLeft: 25, flexGrow: 1, flexShrink: 1, height: 50 }}>
          <PlaceholderLine
            width={70}
            height={18}
            style={{ backgroundColor: Theme.COLORS.colorSecondaryAlt, borderRadius: 100 }}
          />

          <PlaceholderLine
            width={30}
            height={18}
            style={{
              backgroundColor: Theme.COLORS.colorSecondaryAlt,
              borderRadius: 100,
              position: 'relative',
              top: -5
            }}
          />
        </View>

        <PlaceholderLine
          width={12}
          height={17}
          style={{ borderRadius: 10, backgroundColor: Theme.COLORS.colorSecondaryAlt }}
        />
      </View>
      <View style={{ marginVertical: 5 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <PlaceholderLine style={{ borderRadius: 15, width: 55, height: 55, backgroundColor: Theme.COLORS.colorSecondaryAlt }} />
        <View style={{ marginLeft: 25, flexGrow: 1, flexShrink: 1, height: 50 }}>
          <PlaceholderLine
            width={70}
            height={18}
            style={{ backgroundColor: Theme.COLORS.colorSecondaryAlt, borderRadius: 100 }}
          />

          <PlaceholderLine
            width={30}
            height={18}
            style={{
              backgroundColor: Theme.COLORS.colorSecondaryAlt,
              borderRadius: 100,
              position: 'relative',
              top: -5
            }}
          />
        </View>

        <PlaceholderLine
          width={12}
          height={17}
          style={{ borderRadius: 10, backgroundColor: Theme.COLORS.colorSecondaryAlt }}
        />
      </View>
    </Placeholder>
  )
}

export default SkeletonServices
