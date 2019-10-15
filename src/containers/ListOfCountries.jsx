import React, { useState } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import { useQuery } from '@apollo/react-hooks'

// Import querys
import { COUNTRIES } from '../graphql/querys/Querys'

// Import theme
import { Theme } from '../constants/Theme'

// Import components
import Loader from '../components/loader/Loader'
import Picture from '../components/picture/Picture'

const ListOfCountries = props => {
  const { data, error, loading } = useQuery(COUNTRIES)

  return (
    <>
      {loading ? (
        <Loader />
      )
        : data.countries.map(({ id, name, phonecode, flag }) => {
          console.log(flag)
          return (
            <Picture
              key={id}
              source={{ uri: flag }}
            />
          )
        })}
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
