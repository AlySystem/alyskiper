import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native'

// Import components
import Picture from '../picture/Picture'
import Icon from '../icon/Icon'
import Modal from '../modal/Modal'

// Import containers
import ListOfCountries from '../../containers/ListOfCountries'

// Import theme
import { Theme } from '../../constants/Theme'

const ModalPicker = props => {
  const [isVisible, setIsVisible] = useState(false)
  const [details, setDetails] = useState({
    uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAeCAMAAABpA6zvAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAqBQTFRFYpH1YZH1dZTGZJHuYZH2YpD1YpD2ZpLrbJHVcpHAZpHn5Oz95Oz+3+by1NCs39zC5Ov65Oz/3ubZ4Oji5Oz7393J1dK04ej03+bx1NGz5OHI6O765u7/5u7+6O773+DV1dO23+XuZ4/cgpemeJW8ZpHpYpH2YZH3Z5LmfJa4f5WpZI3eU4f0Uof2U4f1VofsYYrUYYnSVYfuVIfyV4fnXIjaZovIW4njc46vdY2lVobpY4nMZYnGWIfoUob0Uob1WojhcY6yXYbTXYfWVIbvXYnhXIniUobxW4fccY2ub422V4blaJDac5PCgrCofqyzW+q5Zum5///////+9fDZ8erM/Pv0///57s13rIZNr4lM8tSG///9+/nx8enH+vbo/Pr07eO09/Ph8ujHjo54cneElJR79u7T8+7X8OjB/v78+PXo6uK5+ffs//3upd2rKcTnLMfiLMTiK8TlseGv//70+ffr7ua/+fft+fbn7uW6+/rz3vW7MvfRCP71GPHkGuziA//6OPjQ5vfG/Pv17ubB9/Tl9/Ti7uW3/Pv3//jih82yQMqQZ8thVM99Ws5yXM1vO8+6lc+2//vq+/r17ObK+ffv//7+/Prv///81dCvWHupXY9TdJU7c5Q9c5Q6dpY3bI1eZICl3di48+zP/fz2+vTa/v35+/PQipixSG/nSnPlSnDlSnLjS3DjSnPiS3LgSm/jlp6u/ffb/fvw+vXc+vjw8+3T+fHL3NvE19jN2NfM19jM19fM19bN39vD+vTS+fTf+vfrXIjbbIq0do6kZYrJV4flU4fxVYbsWofdY4nKaIm7aYvBXYjbUof0WIjnaIvDZYjBaYzEZ4vHbYu0Z4i6YYnTVIfwVYftWIfiXIneXIjfWIflVYfsUof1JwACHgAAACx0Uk5T/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v4R0Yc9AAAAAWJLR0RSDWAtkAAAAAlwSFlzAAAASAAAAEgARslrPgAAAXhJREFUOMtj0CESMAxRhbq6RCjU09HRNzA0MgYx8Co0MTUzt7C0sraxRVdohwzsHRydnF1c3dw9PL28UWTsGJABo48vEzMLq58/Gws7BycXI4okNwLw8PLxC/AICgUECgvyiIiKifMgSTIEIUBwSGhYUFB4RGRUdExQUGxcPJJcELLChMQkIJmckpqalg5kZGRm4VCYnZMbFJSXX1BYVFxSGhRUVl6BQ2FlVXVQUE1tXX1DY1NzUFBLaxsOhe0dnUFd3T29ff0TJk6aHDRl6jQcCqfPyJo5a/acufPmL1i4aHFQ9ZKlOBQGLVu+YuWq1WvWrlu/YeOmzVu24vJ10LbtO3bu2r1n997du/ftP3DwEIpC5ACXkJSSlpEFAxk5eQVFlABHBixKyiqqLCwMaizqGppa2iwokqiJ4vCRo8eOnzh56vSZs+fOoyYKtOR44aLjpctXrl67fkMPf3rU07l56/adu/fuE5EV9O7r6enpEKGQBrmQTgoB+l4eQVzTJI0AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTMtMTAtMDdUMTM6MTQ6MjgrMDI6MDDo/EIvAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEzLTEwLTA3VDEzOjE0OjI4KzAyOjAwmaH6kwAAAABJRU5ErkJggg==',
    phoneCode: '+505'
  })

  const handleOnSelect = (details) => {
    setDetails({
      uri: details.flag,
      phoneCode: `+${details.phonecode}`
    })
  }

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
      <TouchableOpacity
        style={styles.container}
        onPress={() => setIsVisible(true)}
      >
        <Picture
          styles={styles.flag}
          source={{ uri: details.uri }}
        />
        <Text style={styles.code}>{details.phoneCode}</Text>
        <Icon
          iconName='arrow-drop-down'
          iconSize={25}
        />
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  flag: {
    width: 37,
    height: 24
  },
  code: {
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.small,
    paddingLeft: 5,
    color: Theme.COLORS.colorParagraph
  }
})

export default ModalPicker
