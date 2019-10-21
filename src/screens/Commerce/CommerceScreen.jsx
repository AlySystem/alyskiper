import React from 'react'
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native'
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade
} from 'rn-placeholder'
import { useQuery } from '@apollo/react-hooks'

// Import container
import ListOfPromotion from '../../containers/ListOfPromotion'
import ListOfCommerce from '../../containers/ListOfCommerce'

// Import components
import Background from '../../components/background/Background'

// Import querys
import { COMMERCERS } from '../../graphql/querys/Querys'

const CommerceScreen = props => {
  const { data, error, loading } = useQuery(COMMERCERS)

  return (
    <Background>
      <View style={styles.screen}>
        {loading ? (
          <Placeholder
            Animation={Fade}
            Left={PlaceholderMedia}
            Right={PlaceholderMedia}
          >
            <PlaceholderLine width={80} />
            <PlaceholderLine />
            <PlaceholderLine width={30} />
          </Placeholder>
        ) : (
          <ScrollView
            keyboardShouldPersistTaps='always'
          >
            <ListOfPromotion />
            <View style={{ paddingVertical: 10 }} />
            <ListOfCommerce
              navigation={props.navigation}
              data={data}
            />
          </ScrollView>
        )}
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)'
  }
})

export default CommerceScreen
