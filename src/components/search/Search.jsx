import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Keyboard
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

// Import action types
import { DIRECTION } from '../../store/actionTypes'

// Import theme
import { Theme } from '../../constants/Theme'

// Import components
import InputControl from '../../components/input/InputControl'
import ShowResult from './ShowResult'

// Import utils
import { keys } from '../../utils/keys'

const Search = props => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const { latitude, longitude } = props.location
  const { iso } = useSelector(state => state.user)
  const [predictions, setPredictions] = useState()

  const handleOnChange = async value => {
    setValue(value)
    const apiUrl = `${keys.googleMaps.autocomplete}json?input=${value}&location=${latitude}, ${longitude}&key=${keys.googleMaps.apiKey}&components=country:${iso}&language=es&radius=2000`
    const response = await fetch(apiUrl)
    const data = await response.json()

    setPredictions(data.predictions)
  }

  return (
    <View style={styles.container}>
      <InputControl
        value={value}
        setValue={setValue}
        onChangeText={handleOnChange}
        placeholder='Destino'
        placeholderTextColor={Theme.COLORS.colorParagraphSecondary}
        stylesInput={styles.input}
        isActiveIcon
        isActiveButton
        stylesButton={styles.button}
        iconName='search'
        iconSize={25}
        stylesIcon={{
          position: 'absolute',
          top: 10,
          left: 20
        }}
      />

      <FlatList
        keyboardShouldPersistTaps='always'
        data={predictions}
        renderItem={({ item }) => (
          <ShowResult
            title={item.structured_formatting.main_text}
            description={item.description}
            onPress={() => {
              setPredictions([])
              setValue(item.structured_formatting.main_text)
              Keyboard.dismiss()
              dispatch({
                type: DIRECTION,
                payload: {
                  directions: {
                    placeId: item.place_id,
                    address: item.structured_formatting.main_text
                  }
                }
              })
              return props.setIsVisible(!props.isVisible)
            }}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={{ color: 'white' }}>No hay resultados</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  containerPredictions: {
    backgroundColor: Theme.COLORS.colorMainAlt,
    paddingVertical: 10
  },
  input: {
    backgroundColor: Theme.COLORS.colorMainDark,
    borderRadius: 100,
    paddingLeft: 55,
    paddingRight: 50,
    paddingVertical: 8,
    borderWidth: 0.3,
    borderColor: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    color: Theme.COLORS.colorParagraph,
    marginBottom: 5
  },
  button: {
    position: 'absolute',
    right: 15,
    top: 12
  },
  resultText: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.small
  }
})

export default Search
