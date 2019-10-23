import React, { useState } from 'react'
import {
  StyleSheet
} from 'react-native'

import Item from '../components/item/Item'

const items = [
  {
    key: 1,
    name: 'Casa',
    description: 'Direccion de la casa'
  },
  {
    key: 2,
    name: 'Trabajo',
    description: 'Direccion de la trabajo'
  },
  {
    key: 3,
    name: 'Casa',
    description: 'Direccion de la casa'
  }
]

const ListOfAddress = props => {
  const [active, setActive] = useState('')

  const handleOnActive = id => {
    setActive(id)
  }

  return (
    <>
      {items.map(item => {
        const isActive = active === item.key
        const className = isActive ? 'rgba(255,255,255,.2)' : 'transparent'

        return (
          <Item
            key={item.key}
            icon='home'
            iconSize={30}
            name={item.name}
            description={item.description}
            iconNameCheck={isActive ? 'check' : 'clear'}
            classActive={className}
            setActive={handleOnActive}
            id={item.key}
          />
        )
      })}
    </>
  )
}

export default ListOfAddress
