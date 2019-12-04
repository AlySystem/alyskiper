import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import { useSelector } from 'react-redux'

// Import components
import Icon from '../icon/Icon'

// Import theme
import { Theme } from '../../constants/Theme'

const Status = props => {
  const { message, date, code } = useSelector(state => state.statusOrder)

  switch (code) {
    case 1:
      break
  }

  return (
    <View>
      <View style={styles.content}>
        <Icon iconName='access-time' iconSize={20} />
        <Text allowFontScaling={false} style={styles.name}>Orden solicitada</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <View style={styles.content}>
        <Icon iconName='access-time' iconSize={20} />
        <Text allowFontScaling={false} style={styles.name}>Orden aceptada</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <View style={styles.content}>
        <Icon iconName='access-time' iconSize={20} />
        <Text allowFontScaling={false} style={styles.name}>Orden en proceso</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <View style={styles.content}>
        <Icon iconName='access-time' iconSize={20} />
        <Text allowFontScaling={false} style={styles.name}>Orden finalizada</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <View style={styles.content}>
        <Icon iconName='access-time' iconSize={20} />
        <Text allowFontScaling={false} style={styles.name}>Orden en camino</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <View style={styles.content}>
        <Icon iconName='access-time' iconSize={20} />
        <Text allowFontScaling={false} style={styles.name}>Orden entregada</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  name: {
    color: Theme.COLORS.colorParagraph,
    fontFamily: 'Lato-Regular',
    fontSize: Theme.SIZES.small,
    marginLeft: 10
  },
  date: {
    color: Theme.COLORS.colorParagraph
  }
})

export default Status
