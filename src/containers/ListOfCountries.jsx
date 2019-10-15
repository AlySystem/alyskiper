import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  ScrollView
} from 'react-native'
import { useQuery } from '@apollo/react-hooks'

// Import querys
import { COUNTRIES } from '../graphql/querys/Querys'

// Import theme
import { Theme } from '../constants/Theme'

// Import components
import Loader from '../components/loader/Loader'
import Modal from '../components/modal/Modal'
import Button from '../components/button/Button'
import Country from '../components/country/Country'
import Title from '../components/title/Title'

const ListOfCountries = props => {
  const { data, error, loading } = useQuery(COUNTRIES)
  return (
    <>
      <Modal
        isVisible={props.isVisible}
      >
        <View
          style={styles.container}
        >
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
          <ScrollView>
            {!loading
              ? data.countries.map((country) => (
                <Country
                  key={country.id}
                  {...country}
                  onPress={() => {
                    props.setIsVisible(!props.isVisible)
                    return props.handleOnSelect({ ...country })
                  }}
                />
              ))
              : (
                <Loader />
              )}
          </ScrollView>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: Theme.COLORS.colorMain
  },
  title: {
    color: Theme.COLORS.colorParagraph,
    fontSize: Theme.SIZES.normal,
    fontFamily: 'Lato-Bold'
  },
  container: {
    flex: 1,
    backgroundColor: Theme.COLORS.colorMainAlt
  },
  button: {
    paddingHorizontal: 5
  }
})

export default ListOfCountries
