import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions
} from 'react-native'
import { useMutation } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'
import { showMessage } from 'react-native-flash-message'

// Import components
import Background from '../../components/background/Background'
import Title from '../../components/title/Title'
import InputControl from '../../components/input/InputControl'
import IconButton from '../../components/button/IconButton'

// Import mutations
import { REGISTERUSERADDRESS } from '../../graphql/mutations/Mutations'

// Import containers
import ListOfCategoryAddress from '../../containers/ListOfCategoryAddress'

// Import theme
import { Theme } from '../../constants/Theme'

const { height } = Dimensions.get('window')

const AddAddressScreen = props => {
  const { navigate } = props.navigation
  const [details] = useState(props.navigation.getParam('details'))
  const [categoryId, setCategoryId] = useState(null)
  const [numberHouse, setNumberHouse] = useState('')
  const [point, setPoint] = useState('')
  const { userId } = useSelector(state => state.user)

  const [RegisterAddress, { data, loading }] = useMutation(REGISTERUSERADDRESS)

  useEffect(() => {
    if (data !== undefined) {
      if (data.registerUsersAddress) {
        showMessage({
          message: 'AlySkiper',
          description: 'Direccion registrada correctamente',
          backgroundColor: 'green',
          color: '#fff',
          icon: 'success',
          titleStyle: {
            fontFamily: 'Lato-Bold'
          },
          textStyle: {
            fontFamily: 'Lato-Regular'
          }
        })
        navigate('Address')
      }
    }
  }, [data])

  const handleOnSubmit = () => {
    if (numberHouse.length > 0 && point.length > 0 && categoryId !== null) {
      RegisterAddress({
        variables: {
          input: {
            iduser: userId,
            placeid: details.placeId,
            id_cat_place_user: categoryId,
            lat: details.destination.latitude,
            lng: details.destination.longitude,
            address: details.address,
            apt_house_number: numberHouse,
            point_references: point
          }
        }
      })
    } else {
      showMessage({
        message: 'Error',
        description: 'Por favor completa todos los datos.',
        backgroundColor: 'red',
        color: '#fff',
        icon: 'error',
        titleStyle: {
          fontFamily: 'Lato-Bold'
        },
        textStyle: {
          fontFamily: 'Lato-Regular'
        }
      })
    }
  }

  return (
    <Background>
      <View style={styles.screen}>
        <ScrollView keyboardShouldPersistTaps='always'>
          <View style={{ paddingVertical: 10 }} />
          <Title
            styles={{
              color: Theme.COLORS.colorParagraph,
              fontFamily: 'Lato-Bold',
              fontSize: Theme.SIZES.normal,
              textAlign: 'center'
            }}
            title='COMPLETA LOS DATOS'
          />
          <View style={{ paddingVertical: 10 }} />
          <View style={styles.layout}>
            <InputControl
              value={details.address}
              placeholder='Direccion'
              placeholderTextColor={Theme.COLORS.colorParagraph}
              isActiveIcon
              iconSize={25}
              iconColor={Theme.COLORS.colorSecondary}
              iconName='location-on'
              stylesInput={[styles.stylesInput, { fontSize: 14 }]}
            />

            <InputControl
              placeholder='Punto de referencia'
              placeholderTextColor={Theme.COLORS.colorParagraph}
              isActiveButton
              isActiveIcon
              onChangeText={value => setPoint(value)}
              value={point}
              setValue={setPoint}
              iconSize={25}
              iconColor={Theme.COLORS.colorSecondary}
              iconName='my-location'
              stylesInput={styles.stylesInput}
            />

            <InputControl
              placeholder='Numero de casa o apto.'
              placeholderTextColor={Theme.COLORS.colorParagraph}
              isActiveButton
              onChangeText={value => setNumberHouse(value)}
              value={numberHouse}
              setValue={setNumberHouse}
              isActiveIcon
              iconSize={25}
              iconColor={Theme.COLORS.colorSecondary}
              iconName='control-point'
              stylesInput={styles.stylesInput}
            />

            <View style={{
              paddingHorizontal: 10,
              width: '100%'
            }}
            >
              <Text style={{
                color: Theme.COLORS.colorParagraph,
                fontFamily: 'Lato-Regular'
              }}
              >REGISTRAR COMO:
              </Text>

              <View style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 25
              }}
              >
                <ListOfCategoryAddress
                  handleOnSelect={id => setCategoryId(id)}
                />
              </View>
            </View>

            <View style={{ marginTop: 40, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <IconButton
                isActiveIcon
                iconName='check'
                message='GUARDAR'
                isLoading={loading}
                onPress={handleOnSubmit}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'rgba(0,0,0,.5)',
    flex: 1
  },
  layout: {
    paddingHorizontal: 20
  },
  stylesInput: {
    backgroundColor: Theme.COLORS.colorMainDark,
    borderRadius: 100,
    paddingLeft: 55,
    paddingRight: 50,
    paddingVertical: 12,
    marginBottom: height * 0.03,
    borderWidth: 0.3,
    borderColor: Theme.COLORS.colorSecondary,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    color: Theme.COLORS.colorParagraph
  }
})

export default AddAddressScreen
