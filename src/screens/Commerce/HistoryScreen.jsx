import React from 'react'
import {
	View,
	Text,
	StyleSheet
} from 'react-native'

// Import components
import Background from '../../components/background/Background'
import Header from '../../components/header/Header'

// Import theme
import { Theme } from '../../constants/Theme'

const HistoryScreen = props => {
	return (
		<Background>
			<View style={styles.screen}>
				<Header stylesContainer={styles.container} isActiveImage onPress={() => props.navigation.pop()} />
			</View>
		</Background>
	)
}

const styles = StyleSheet.create({
	screen: {
		backgroundColor: 'rgba(0,0,0,.5)',
		flex: 1
	},
	container: {
		flexDirection: 'row-reverse',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		position: 'absolute',
		top: 0,
		left: 0,
		paddingVertical: 12,
		backgroundColor: Theme.COLORS.colorMainAlt
	}
})

export default HistoryScreen
