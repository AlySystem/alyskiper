import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Image,
	Dimensions
} from 'react-native'
import { useQuery } from '@apollo/react-hooks'

// Import components
import Background from '../../components/background/Background'
import Header from '../../components/header/Header'
import Loader from '../../components/loader/Loader'

// Import query
import { CATEGORIESCOMMERCE } from '../../graphql/querys/Querys'

// Import theme
import { Theme } from '../../constants/Theme'

const { height } = Dimensions.get('window')

const CommerceCategoriesScreen = props => {
	const { navigate } = props.navigation
	const { loading, data } = useQuery(CATEGORIESCOMMERCE)

	if (loading) {
		return (
			<Background>
				<View style={styles.screen}>
					<Header stylesContainer={styles.container} isActiveImage onPress={() => props.navigation.pop()} />
					<View style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center'
					}}>
						<Loader />
					</View>
				</View>
			</Background>
		)
	}

	const handleOnPress = (id) => {
		if (id === 1) {
			navigate('Commerce')
		}
	}

	return (
		<Background>
			<View style={styles.screen}>
				<Header stylesContainer={styles.container} isActiveImage onPress={() => props.navigation.pop()} />
				<ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps='always'>
					{data.categoriesCommerce.map(category => (
						<TouchableOpacity key={category.id} style={styles.category} onPress={() => handleOnPress(item.id)}>
							<Image
								progressiveRenderingEnabled={true}
								resizeMode="cover"
								style={styles.image}
								source={{ uri: category.url_img_category }} />
							<View style={styles.overlay} />

							<Text style={styles.name}>
								{category.name}
							</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
			</View>
		</Background>
	)
}

const styles = StyleSheet.create({
	screen: {
		backgroundColor: 'rgba(0,0,0,.5)',
		alignItems: 'center',
		flex: 1
	},
	category: {
		backgroundColor: Theme.COLORS.colorMainDark,
		borderWidth: 1,
		borderColor: Theme.COLORS.colorSecondary,
		marginVertical: 10,
		borderRadius: 5,
		position: 'relative',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: height * 0.5
	},
	container: {
		flexDirection: 'row-reverse',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		paddingVertical: 12,
		backgroundColor: Theme.COLORS.colorMainAlt
	},
	name: {
		fontFamily: 'Lato-Regular',
		textTransform: 'uppercase',
		fontWeight: 'bold',
		fontSize: Theme.SIZES.title,
		color: Theme.COLORS.colorSecondary
	},
	image: {
		position: 'absolute',
		width: '100%',
		height: '100%'
	},
	overlay: {
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		position: 'absolute',
		width: '100%',
		height: '100%'
	}
})

export default CommerceCategoriesScreen
