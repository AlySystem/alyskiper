import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native'
import { useQuery } from '@apollo/react-hooks'

// Import components
import Country from '../components/country/Country'
import Loader from '../components/loader/Loader'
import Button from '../components/button/Button'
import Title from '../components/title/Title'

// Import theme
import { Theme } from '../constants/Theme'

// Import query
import { COUNTRIES } from '../graphql/querys/Querys'

const ListOfCountries = props => {
  const { data, error, loading } = useQuery(COUNTRIES)

  if (error) return <Text>Error {error}</Text>

  return (
    <>
      <View style={styles.containerHeader}>
        <Title
          title='Selecciona tu país'
          styles={styles.title}
        />
        <Button
          iconName='cancel'
          iconSize={25}
          stylesButton={styles.button}
          iconColor={Theme.COLORS.colorSecondary}
          onPress={() => props.setIsVisible(!props.isVisible)}
        />
      </View>
      <ScrollView
        keyboardShouldPersistTaps='always'
        style={{ paddingHorizontal: 10 }}
      >
        {loading ? (
          <View style={{ flex: 1, width: '100%', height: '100%' }}>
            <Loader />
            <View style={{ paddingVertical: 2 }} />
            <Title
              title='Cargando paises'
              styles={styles.subTitle}
            />
          </View>
        ) : data.countries.map(country => (
          <Country
            key={country.id}
            {...country}
            onPress={() => {
              props.setIsVisible(!props.isVisible)
              return props.handleOnSelect({ ...country })
            }}
          />
        ))}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Theme.COLORS.colorMain,
    borderBottomColor: Theme.COLORS.colorSecondary,
    borderBottomWidth: 0.3,
    paddingVertical: 10
  },
  title: {
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.normal,
    fontFamily: 'Lato-Bold'
  },
  subTitle: {
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.xsmall,
    fontFamily: 'Lato-Bold',
    textAlign: 'center'
  },
  button: {
    paddingRight: 10
  }
})

export default ListOfCountries
