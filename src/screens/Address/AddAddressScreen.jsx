import React, { useState } from 'react'
import {
  View
} from 'react-native'
import { useSelector } from 'react-redux'

const AddAddressScreen = props => {
  const [details] = useState(props.navigation.getParam('details'))

  return (
    <View />
  )
}

export default AddAddressScreen
