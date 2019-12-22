import React from 'react'
import {
	View,
	Text,
	StyleSheet
} from 'react-native'

// Import components
import Background from '../../components/background/Background'
import Header from '../../components/header/Header'
import Picture from '../../components/picture/Picture'

// Import theme
import { Theme } from '../../constants/Theme'

const HistoryScreen = props => {
	return (
		<Background>
			<View style={styles.screen}>
				<Header stylesContainer={styles.container} isActiveImage onPress={() => props.navigation.pop()} />
				<View style={styles.layout}>
					<Picture source={require('../../../assets/images/img-alyskiper.png')} />
					<View style={{ marginBottom: 20 }} />
					<Text style={styles.text}>HISTORIAL DE PEDIDOS</Text>
				</View>
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
		paddingVertical: 12,
		backgroundColor: Theme.COLORS.colorMainAlt
	},
	text: {
		color: Theme.COLORS.colorSecondary,
		fontFamily: 'Lato-Regular',
		fontSize: Theme.SIZES.normal
	},
	layout: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default HistoryScreen
