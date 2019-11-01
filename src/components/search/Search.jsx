import React, { useState } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import { useSelector } from 'react-redux'

// Import theme
import { Theme } from '../../constants/Theme'

// Import components
import InputControl from '../../components/input/InputControl'

const Search = props => {
  const [value, setValue] = useState('')
  const { firstName, iso } = useSelector(state => state.user)
  const { latitude, longitude } = useSelector(state => state.location)

  const handleOnChange = (value) => {
    setValue(value)
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
        iconName='search'
        iconSize={25}
        stylesIcon={{
          position: 'absolute',
          top: 10,
          left: 20
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 20
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
    color: Theme.COLORS.colorParagraph
  }
})

export default Search
