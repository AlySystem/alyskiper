import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native'

// Import components
import Picture from '../components/picture/Picture'

// Import theme
import { Theme } from '../constants/Theme'

const items = [
  {
    key: 2,
    name: 'Casa',
    image: 'https://storage.googleapis.com/app_user_bucket/house.png'
  },
  {
    key: 1,
    name: 'Oficina',
    image: 'https://storage.googleapis.com/app_user_bucket/job.png'
  },
  {
    key: 3,
    name: 'Otro',
    image: 'https://storage.googleapis.com/app_user_bucket/other.png'
  }
]

const ListOfCategoryAddress = props => {
  return (
    <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
      {items.map(item => (
        <TouchableOpacity
          onPress={() => props.handleOnSelect(item.key)}
          key={item.key}
          style={styles.container}
        >
          <Picture
            source={{ uri: item.image }}
            styles={styles.image}
          />
          <View style={{ paddingVertical: 4 }} />
          <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    fontFamily: 'Lato-Bold',
    color: Theme.COLORS.colorSecondary,
    fontSize: Theme.SIZES.small
  },
  image: {
    resizeMode: 'contain',
    width: 60,
    height: 60
  }
})

export default ListOfCategoryAddress
