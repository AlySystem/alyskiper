import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList
} from 'react-native'
import { useQuery } from '@apollo/react-hooks'

// Import components
import Country from '../components/country/Country'
import Loader from '../components/loader/Loader'
import Button from '../components/button/Button'
import Title from '../components/title/Title'
import InputControl from '../components/input/InputControl'

// Import theme
import { Theme } from '../constants/Theme'

// Import query
import { COUNTRIES } from '../graphql/querys/Querys'

const ListOfCountries = props => {
  const { data, error, loading } = useQuery(COUNTRIES)
  const [staticData, setStaticData] = useState('')

  const [search, setSearch] = useState('')
  const [sourceData, setSourceData] = useState('')
  const [backupData, setBackupData] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    const verifyData = () => {
      if (!loading) {
        setStaticData(data)
        setSourceData(data.countries)
        setBackupData(data.countries)
      }
    }
    verifyData()
  }, [loading])

  if (error) return <Text allowFontScaling={false}>Error {error}</Text>
  if (loading) {
    return (
      <View style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Loader />
        <View style={{ paddingVertical: 2 }} />
        <Title
          title='Cargando paises'
          styles={styles.subTitle}
        />
      </View>
    )
  }

  const filterList = text => {
    setSearch(text)
    let newData = backupData
    newData = backupData.filter(item => {
      const itemData = item.name.toLowerCase()
      const textData = text.toLowerCase()
      return itemData.indexOf(textData) > -1
    })

    setSourceData(newData)
  }

  const onRefresh = () => {
    setSourceData([])
    setRefreshing(true)
  }

  const renderItem = (item) => {
    return (
      <Country
        flag={item.flag}
        name={item.name}
        phonecode={item.phonecode}
        onPress={() => {
          props.setIsVisible(!props.isVisible)
          return props.handleOnSelect({ ...item })
        }}
      />
    )
  }

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
      <View>
        <InputControl
          value={search}
          setValue={setSearch}
          placeholder='Buscar...'
          placeholderTextColor={Theme.COLORS.colorParagraph}
          onChangeText={(value) => filterList(value)}
          isActiveButton
          isActiveIcon
          iconSize={25}
          iconColor={Theme.COLORS.colorSecondary}
          iconName='search'
        />
      </View>
      <FlatList
        keyboardShouldPersistTaps='always'
        data={sourceData}
        renderItem={({ item }) => renderItem(item)}
        // renderItem={({ item }) => (
        //   <Country
        //     {...item}
        //     onPress={() => {
        //       props.setIsVisible(!props.isVisible)
        //       return props.handleOnSelect({ ...item })
        //     }}
        //   />
        // )}
        keyExtractor={(item, index) => index.toString()}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
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
