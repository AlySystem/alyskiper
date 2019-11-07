import React, { useState } from 'react'
import {
  View
} from 'react-native'

// Import components
import Address from '../components/address/Address'

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
  const [active, setActive] = useState('')

  const handleActive = id => {
    setActive(id)
    props.handleOnSelect(id)
  }

  return (
    <View style={{ justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
      {items.map(item => {
        const isActive = active === item.key
        const className = !!isActive

        return (
          <Address
            key={item.key}
            name={item.name}
            image={{ uri: item.image }}
            handleActive={handleActive}
            id={item.key}
            classActive={className}
          />
        )
      })}
    </View>
  )
}

export default ListOfCategoryAddress
