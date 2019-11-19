import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity
} from 'react-native'
import { useSelector } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'

// Import components
import Icon from '../icon/Icon'
import Modal from '../modal/Modal'
import Loader from '../loader/Loader'
import Button from '../button/Button'

// Import querys
import { SEARCHCITY } from '../../graphql/querys/Querys'

// Import theme
import { Theme } from '../../constants/Theme'

const ModalCity = props => {
  const { country_id, cityName } = useSelector(state => state.user)
  const { data, loading } = useQuery(SEARCHCITY, { variables: { id: country_id } })
  const [city, setCity] = useState({ id: 0, name: cityName || 'CIUDAD' })
  const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <Modal
        backgroundColor={Theme.COLORS.colorMainAlt}
        opacity={1}
        style={{
          margin: 0
        }}
        isVisible={isVisible}
      >
        <View style={{
          height: 60,
          width: '100%',
          backgroundColor: Theme.COLORS.colorMain,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 20,
          flexDirection: 'row'
        }}
        >
          <Text style={{
            color: Theme.COLORS.colorParagraph,
            fontFamily: 'Lato-Bold',
            fontSize: Theme.SIZES.normal
          }}
          >CIUDADES
          </Text>
          <Button
            iconName='cancel'
            onPress={() => setIsVisible(!isVisible)}
          />
        </View>
        {loading ? (
          <Loader />
        ) : data.searchCityByCountryId.length === 0 ? (
          <>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20
            }}
            >
              <Text style={{
                color: Theme.COLORS.colorParagraph,
                fontFamily: 'Lato-Regular',
                fontSize: Theme.SIZES.small,
                textAlign: 'center'
              }}
              >Estamos fuera del area de operacion, AlySkiper no esta disponible en tu zona.
              </Text>
            </View>
          </>
        )

          : (
            <FlatList
              data={data.searchCityByCountryId}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10
                  }}
                  onPress={() => {
                    setIsVisible(!isVisible)
                    setCity({ name: item.name, id: item.id })
                    return props.handleOnCity(item.id)
                  }}
                >
                  <Text style={{
                    color: Theme.COLORS.colorParagraph,
                    fontFamily: 'Lato-Regular'
                  }}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          )}
      </Modal>

      <TouchableOpacity
        style={styles.buttonCity}
        onPress={() => setIsVisible(true)}
      >
        <Text allowFontScaling={false} style={styles.city}>{city.name}</Text>
        <Icon
          iconName='arrow-drop-down'
        />
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  buttonCity: {
    backgroundColor: Theme.COLORS.colorMainAlt,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderColor: Theme.COLORS.colorSecondary,
    borderWidth: 0.3,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  city: {
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    color: Theme.COLORS.colorParagraph
  }
})

export default ModalCity
