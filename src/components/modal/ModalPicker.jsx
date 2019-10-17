import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native'

// Import components
import Icon from '../icon/Icon'
import Modal from '../modal/Modal'

// Import containers
import ListOfCountries from '../../containers/ListOfCountries'

// Import theme
import { Theme } from '../../constants/Theme'

const { height } = Dimensions.get('window')

const ModalPicker = props => {
  const [isVisible, setIsVisible] = useState(false)
  const [details, setDetails] = useState({ phoneCode: '+505', country: 'Seleccionar país', id: 154 })

  const handleOnSelect = (details) => {
    setDetails({
      phoneCode: `+${details.phonecode}`,
      country: details.name,
      id: details.id
    })
  }
  props.handleOnSelect(details)

  return (
    <>
      {isVisible && (
        <Modal
          backgroundColor={Theme.COLORS.colorMainAlt}
          opacity={1}
          style={{
            margin: 0
          }}
          isVisible={isVisible}
        >
          <ListOfCountries
            handleOnSelect={handleOnSelect}
            setIsVisible={setIsVisible}
            isVisible={isVisible}
          />
        </Modal>
      )}
      {props.activeCountry ? (
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsVisible(true)}
        >
          <Text style={styles.country}>{details.country}</Text>
          <Icon
            iconName='arrow-drop-down'
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.container}
          onPress={() => setIsVisible(true)}
        >
          <Text style={styles.code}>{details.phoneCode}</Text>
          <Icon
            iconName='arrow-drop-down'
            iconSize={25}
          />
        </TouchableOpacity>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  code: {
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.subTitle,
    paddingLeft: 5,
    color: Theme.COLORS.colorParagraph
  },
  button: {
    backgroundColor: Theme.COLORS.colorMainAlt,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderColor: Theme.COLORS.colorSecondary,
    borderWidth: 0.3,
    borderRadius: 100,
    marginBottom: height * 0.03,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  country: {
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    color: Theme.COLORS.colorParagraph
  }
})

export default ModalPicker
