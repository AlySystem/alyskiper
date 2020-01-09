import React, { useState } from 'react'
import {
  View,
	Text,
	StyleSheet
} from 'react-native'

// Import images
import alyPay from '../../../assets/images/background-alymoney.png'

// Import theme
import { Theme } from '../../constants/Theme'

// Import components
import Background from '../../components/background/Background'
import Input from '../../components/input/InputControl'
import IconButton from '../../components/button/IconButton'

const Retirement = props => {
	const [wallet, setWallet] = useState('')

	return (
		<Background source={alyPay}>
			<View style={styles.screen}>
				<Input
					value={wallet}
					setValue={setWallet}
					placeholder='Agregar wallet'
					placeholderTextColor={Theme.COLORS.colorParagraph}
					onChangeText={value => setWallet(value)}
					isActiveButton
					stylesInput={styles.stylesInput}
				/>

				<View style={styles.containerButton}>
					<IconButton
						message='SOLICITAR PIN'
						isActiveIcon
						iconName='check'
						onPress={() => {}}
						stylesMessage={styles.message}
					/>
				</View>
			</View>
		</Background>
	)
}

const styles = StyleSheet.create({
	screen: {
		marginHorizontal: 20
	},
	stylesInput: {
		backgroundColor: Theme.COLORS.colorMainDark,
		borderRadius: 100,
		paddingLeft: 55,
		paddingRight: 50,
		paddingVertical: 12,
		borderWidth: 0.3,
		borderColor: Theme.COLORS.colorSecondary,
		fontFamily: 'Lato-Regular',
		fontSize: Theme.SIZES.small,
		color: Theme.COLORS.colorParagraph
    },
	message: {
		color: '#fff',
		fontSize: Theme.SIZES.xsmall,
		fontFamily: 'Lato-Bold',
		marginLeft: 8
	},
	button: {
		borderRadius: 100,
		paddingHorizontal: 20,
		height: 55,
		backgroundColor: Theme.COLORS.colorMainAlt,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		width: 250,
		borderBottomColor: Theme.COLORS.colorSecondary,
		borderBottomWidth: 0.3
	},
	containerButton: {
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default Retirement
