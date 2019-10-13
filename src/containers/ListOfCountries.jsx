import React, { useState } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import { Picker } from '@react-native-community/picker'
import { useQuery } from '@apollo/react-hooks'

// Import querys
import { COUNTRIES } from '../graphql/querys/Querys'

// Import theme
import { Theme } from '../constants/Theme'

// Import components
import Loader from '../components/loader/Loader'

const ListOfCountries = props => {
  const { data, error, loading } = useQuery(COUNTRIES)
  const [selected, setSelected] = useState()

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Picker
          selectedValue={selected}
          onValueChange={(itemValue, itemIndex) => setSelected(itemValue)}
          mode='dialog'
          style={styles.picker}
        >
          {data.countries.map(({ id, name }) => (
            <Picker.Item
              key={id}
              label={name}
              value={name}
              itemStyle={styles.item}
            />
          ))}
        </Picker>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  picker: {
    backgroundColor: Theme.COLORS.colorMainAlt,
    color: Theme.COLORS.colorSecondary,
    width: '100%',
    height: 50,
    borderRadius: 20,
    borderColor: Theme.COLORS.colorSecondary,
    borderWidth: 1,
    marginBottom: 12
  },
  item: {
    color: Theme.COLORS.colorSecondary,
    backgroundColor: Theme.COLORS.colorMainAlt
  }
})

export default ListOfCountries
