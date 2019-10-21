import React from 'react'
import {
  View
} from 'react-native'
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from 'rn-placeholder'
import { useQuery } from '@apollo/react-hooks'

// Import querys
import { COMMERCERS } from '../graphql/querys/Querys'

// Import components
import Card from '../components/card/Card'
import { Theme } from '../constants/Theme'

const ListOfCommerce = props => {
  const { navigate } = props.navigation
  const { loading, data } = useQuery(COMMERCERS, { variables: { latitud: props.region.latitude, longitud: props.region.longitude } })

  return (
    <>
      {loading ? (
        <View style={{ paddingHorizontal: 10 }}>
          <Placeholder
            Animation={Fade}
            duration={900}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <PlaceholderMedia
                style={{
                  borderRadius: 100,
                  height: 60,
                  width: 60,
                  backgroundColor: Theme.COLORS.colorSecondary
                }}
              />
              <View style={{ width: '100%', paddingLeft: 10 }}>
                <PlaceholderLine
                  width={60}
                  style={{
                    backgroundColor: Theme.COLORS.colorSecondary
                  }}
                />
                <PlaceholderLine
                  width={30}
                  style={{
                    backgroundColor: Theme.COLORS.colorSecondary
                  }}
                />
              </View>
            </View>
            <View style={{ paddingVertical: 6 }} />
            <PlaceholderMedia
              style={{
                width: '100%',
                height: 200,
                backgroundColor: Theme.COLORS.colorSecondary,
                borderRadius: 10
              }}
            />
          </Placeholder>
        </View>
      ) : (
        data.CommercesIntoRadio.map((commerce, index) => (
          <Card
            key={index}
            name={commerce.namecommerce}
            description={commerce.address}
            sourceLogo={{ uri: commerce.url_logo }}
            sourceImage={{ uri: commerce.url_art }}
            onPress={() => navigate('ProfileCommerce', { commerce: commerce })}
          />
        ))
      )}
    </>
  )
}

export default ListOfCommerce
