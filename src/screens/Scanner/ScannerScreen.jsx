import React from 'react'
import {
  View
} from 'react-native'
import { CameraKitCamera } from 'react-native-camera-kit'

// Import theme
import { Theme } from '../../constants/Theme'

const ScannerScreen = props => {
  return (
    <View style={{ flex: 1 }}>
      <CameraKitCamera
        style={{ flex: 1 }}
        showFrame
        scanBarcode
        frameColor={Theme.COLORS.colorSecondary}
        laserColor={Theme.COLORS.colorMainDark}
        colorForScannerFrame='black'
        onReadQRCode={(event) => console.log(event.nativeEvent.qrcodeStringValue)}
      />

    </View>
  )
}

export default ScannerScreen
