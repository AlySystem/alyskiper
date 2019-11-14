import React, { useRef, useState, useEffect } from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { useSelector } from 'react-redux'

// Import theme
import { Theme } from '../../constants/Theme'

// Import custom hooks
import { useLocation } from '../../hooks/useLocation'

// Import components
import { Map } from '../../components/map/MapView'
import InputControl from '../../components/input/InputControl'
import ModalTransport from '../../components/modal/ModalTransport'

const TransportScreen = props => {
  const { location, loading } = useLocation()
  const { firstName } = useSelector(state => state.user)
  const [isVisible, setIsVisible] = useState(false)

  const mapView = useRef(null)

  return (
    <View style={styles.screen}>
      <ModalTransport
        navigation={props.navigation}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
      {!loading && (
        <Map
          mapView={mapView}
          location={location}
        />
      )}
      <TouchableOpacity
        onPress={() => setIsVisible(!isVisible)}
        style={styles.containerInput}
      >
        <View pointerEvents='none'>
          <InputControl
            stylesContainer={styles.container}
            stylesInput={styles.input}
            placeholder={`${firstName} ¿Donde quieres ir?`}
            placeholderTextColor={Theme.COLORS.colorParagraphSecondary}
            isActiveIcon
            iconSize={25}
            iconColor={Theme.COLORS.colorSecondary}
            iconName='search'
          />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Theme.COLORS.colorMainAlt
  },
  fixed: {
    backgroundColor: Theme.COLORS.colorMainDark,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
    flexDirection: 'row'
  },
  fixedText: {
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.xsmall,
    color: Theme.COLORS.colorParagraph
  },
  containerInput: {
    position: 'absolute',
    top: 20,
    right: 0,
    width: '100%',
    paddingHorizontal: 20
  },
  container: {

  },
  input: {
    backgroundColor: Theme.COLORS.colorMainDark,
    borderRadius: 100,
    paddingLeft: 50,
    paddingVertical: 10,
    borderWidth: 0.3,
    borderColor: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    color: Theme.COLORS.colorParagraph
  }
})

export default TransportScreen
