import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity
} from 'react-native'
import { useQuery } from '@apollo/react-hooks'

// Import components
import Background from '../../components/background/Background'
import Header from '../../components/header/Header'
import Loader from '../../components/loader/Loader'
import Picture from '../../components/picture/Picture'

// Import query
import { CATEGORIESCOMMERCE } from '../../graphql/querys/Querys'

// Import theme
import { Theme } from '../../constants/Theme'

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
				<FlatList
					data={data.categoriesCommerce}
					renderItem={({ item }) => (
						<TouchableOpacity style={styles.category} onPress={() => handleOnPress(item.id)}>
							<Picture styles={styles.image} source={{ uri: item.url_img_category }} />
							<Text style={styles.name}>{item.name}</Text>
						</TouchableOpacity>
					)}
					keyExtractor={(_, index) => index.toString()}
				/>
			</View>
		</Background>
	)
}

const styles = StyleSheet.create({
	screen: {
		backgroundColor: 'rgba(0,0,0,.5)',
		flex: 1
	},
	category: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 400,
		height: 200
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
		fontSize: Theme.SIZES.small,
		color: Theme.COLORS.colorSecondary
	},
	image: {
		resizeMode: 'cover',
		width: 210,
		height: 180
	}
})

export default CommerceCategoriesScreen
