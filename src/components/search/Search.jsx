import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Keyboard,
  Text,
  Dimensions,
  ScrollView
} from 'react-native'
import { useSelector } from 'react-redux'

// Import utils
import { keys } from '../../utils/keys'

// Import components
import InputControl from '../input/InputControl'
import ShowResult from '../search/ShowResult'

// Import theme
import { Theme } from '../../constants/Theme'

const { height } = Dimensions.get('window')

const Search = props => {
  const { iso, firstName } = useSelector(state => state.user)
  const [search, setSearch] = useState('')
  const [predictions, setPredictions] = useState()

  const handleOnChange = async (value) => {
    setSearch(value)
    const { latitude, longitude } = props.origen
    const apiUrl = `${keys.googleMaps.autocomplete}json?input=${search}&location=${latitude}, ${longitude}&key=${keys.googleMaps.apiKey}&components=country:${iso}&language=es&radius=2000`
    const response = await fetch(apiUrl)
    const data = await response.json()

    setPredictions(data.predictions)
  }

  return (
    <View style={styles.container}>
      <InputControl
        value={search}
        setValue={setSearch}
        placeholder={`${firstName} ¿Donde quieres ir?`}
        placeholderTextColor={Theme.COLORS.colorParagraphSecondary}
        onChangeText={handleOnChange}
        isActiveIcon
        isActiveButton
        isValue={setSearch}
        iconSize={25}
        iconColor={Theme.COLORS.colorSecondary}
        iconName='search'
        stylesInput={props.stylesInput || styles.stylesInput}
      />
      {predictions && (
        <View style={props.containerPredictions || styles.containerPredictions}>
          <Text style={styles.resultText}>Destinos sugeridos</Text>
          <View style={{ paddingVertical: 5 }} />

          <ScrollView
            contentContainerStyle={styles.scrollView}
            keyboardShouldPersistTaps='always'
          >
            {predictions.map(prediction => (
              <ShowResult
                key={prediction.place_id}
                title={prediction.structured_formatting.main_text}
                description={prediction.description}
                onPress={() => {
                  setPredictions([])
                  setSearch(prediction.structured_formatting.main_text)
                  Keyboard.dismiss()
                  return props.handleDetails(prediction.place_id, { main_text: prediction.structured_formatting.main_text, description: prediction.description })
                }}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  containerPredictions: {
    backgroundColor: Theme.COLORS.colorMainAlt,
    paddingVertical: 10
  },
  stylesInput: {
    backgroundColor: Theme.COLORS.colorMainDark,
    borderRadius: 8,
    paddingLeft: 55,
    paddingRight: 50,
    paddingVertical: 10,
    borderWidth: 0.3,
    borderColor: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    color: Theme.COLORS.colorParagraph
  },
  resultText: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Bold',
    fontSize: Theme.SIZES.small
  }
})

export default Search
