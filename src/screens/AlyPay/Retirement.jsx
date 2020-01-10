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
	const [amount, setAmout] = useState('')
	const [wallet, setWallet] = useState('')
	const [pin, setPin] = useState('')

	return (
		<Background source={alyPay}>
			<Text allowFontScaling={false} style={styles.title}>Retiros</Text>
			<View style={styles.screen}>
				<Input
					value={amount}
					setValue={setAmout}
					placeholder='Saldo a retirar'
					placeholderTextColor={Theme.COLORS.colorParagraph}
					onChangeText={value => setAmout(value)}
					isActiveButton
					stylesInput={styles.stylesInput}
				/>
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
				<View style={{ marginVertical: 20 }} />
				<Input
					value={pin}
					setValue={setPin}
					placeholder='Ingresar PIN'
					placeholderTextColor={Theme.COLORS.colorParagraph}
					onChangeText={value => setAmout(value)}
					isActiveButton
					stylesInput={styles.stylesInput}
				/>
				<View style={{ marginVertical: 5 }} />
				<View style={styles.containerButton}>
					<IconButton
						message='RETIRAR'
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
		flex: 1,
		marginHorizontal: 20
	},
	title: {
		fontFamily: 'Lato-Bold',
		fontSize: Theme.SIZES.h1,
		textAlign: 'center',
		textTransform: 'uppercase',
		color: Theme.COLORS.colorSecondary,
		paddingVertical: 30
	},
	stylesInput: {
		backgroundColor: Theme.COLORS.colorMainDark,
		borderRadius: 100,
		paddingLeft: 55,
		paddingRight: 50,
		paddingVertical: 12,
		borderWidth: 0.3,
		marginBottom: 20,
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
