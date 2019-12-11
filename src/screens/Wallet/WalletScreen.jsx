import React from 'react'
import {
  View,
	Text,
	TouchableOpacity,
	FlatList,
	StyleSheet,
	ScrollView
} from 'react-native'
import { useQuery } from '@apollo/react-hooks'

// Import components
import Title from '../../components/title/Title'
import Background from '../../components/background/Background'
import Loader from '../../components/loader/Loader'
import { LazyImage } from '../../components/lazy/LazyImage'
import Icon from '../../components/icon/Icon'

// Import theme
import { Theme } from '../../constants/Theme'

// Import querys
import { GETPACKAGES } from '../../graphql/querys/Querys'

const WalletScreen = props => {
	const { loading, data, error } = useQuery(GETPACKAGES)

	if (loading) {
		return (
			<View style={styles.container}>
				<Loader />
			</View>
		)
	}

  return (
		<Background source={require('../../../assets/images/background-alycoin.png')}>
			<View style={styles.screen}>
				<Title title='Paquetes de recargas' stylesContainer={{ marginVertical: 10 }} styles={styles.title} />
				<View style={{paddingHorizontal: 20}}>
					<FlatList
						style={{flexGrow: 1, marginBottom: 60}}
						data={data.GetPackages.reverse()}
						renderItem={({ item }) => (
							<TouchableOpacity style={styles.containerTouch} onPress={() => {}}>
								<LazyImage
									styleLazyImage={{
										width: 100,
										height: 100,
										resizeMode: 'cover',
										borderRadius: 200
									}}
									sourceLazy={require('../../../assets/images/img-lazy.png')}
									source={{ uri: item.img_url}}
									styleImage={{
										width: 100,
										height: 100,
										resizeMode: 'contain'
									}}
								/>
								<Text style={{ color: Theme.COLORS.colorSecondary, marginTop: 10, fontSize: Theme.SIZES.normal }}>{item.name}</Text>
                <Text style={{ color: '#EEE', marginTop: 10, fontSize: Theme.SIZES.small }}>$ {Number(item.price).toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
								<View style={{marginVertical: 5}} />
								<View style={{
										alignItems: 'center',
										justifyContent: 'center',
										backgroundColor: Theme.COLORS.colorMain,
										borderColor: 'blue',
										borderRadius: 5,
										padding: 5,
										flexDirection: 'row',
										borderWidth: 1,
										width: '80%'
								}}>
										<Text style={{ color: Theme.COLORS.colorSecondary }}>Seleccionar paquete</Text>
										<Icon iconName='chevron-right' iconColor={Theme.COLORS.colorSecondary} iconSize={28} />
								</View>
							</TouchableOpacity>
						)}
						keyExtractor={(item, index) => index.toString()}
					/>
				</View>
			</View>
		</Background>
  )
}

const styles = StyleSheet.create({
	screen: {
		flex: 1
	},
	title: {
		color: Theme.COLORS.colorSecondary,
		fontFamily: 'Lato-Bold',
		fontSize: Theme.SIZES.title,
		textAlign: 'center'
	},
	container: {
		flex: 1,
		backgroundColor: Theme.COLORS.colorMainDark,
		justifyContent: 'center',
		alignItems: 'center'
	},
	containerTouch: {
		backgroundColor: Theme.COLORS.colorMainAlt,
		marginBottom: 20,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		maxWidth: 450,
		paddingVertical: 15,


		borderColor: 'blue',
		elevation: 20,
		borderRadius: 10,
		borderWidth: 2,
	}
})

export default WalletScreen
