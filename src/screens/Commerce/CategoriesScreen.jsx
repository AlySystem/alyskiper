import React, { useState } from 'react'
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	TouchableOpacity,
	Image,
	ActivityIndicator
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
import { ScrollView } from 'react-native-gesture-handler'

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

	const CategoryComponent = (item, key) => {
		// const [loader, setLoader] = useState(true)

		console.log(item)


		return (
			<TouchableOpacity key={key} style={styles.category} onPress={() => handleOnPress(item.id)}>
				{/* {
					loader &&
					<ActivityIndicator color="#FFF" size="small" />
				} */}

				<Image
					progressiveRenderingEnabled={true}
					resizeMode="cover"
					style={styles.image}
					source={{ uri: item.url_img_category }} />

				<View style={styles.overlay} />

				{/* <Image progressiveRenderingEnabled={true} resizeMode="contain" styles={styles.image} source={require('../../../assets/images/img-icon-vip.png')} /> */}

				<Text style={styles.name}>
					{item.name}
				</Text>
			</TouchableOpacity>
		)
	}

	return (
		<Background>
			<View style={styles.screen}>
				<Header stylesContainer={styles.container} isActiveImage onPress={() => props.navigation.pop()} />

					{
						data.categoriesCommerce.map(CategoryComponent)
					}
				{/* <ScrollView style={{ width: '100%', height: '100%' }}>

				</ScrollView> */}

				{/* <FlatList
					data={data.categoriesCommerce}
					renderItem={CategoryComponent}
					keyExtractor={(_, index) => index.toString()}
				/> */}
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
		width: '80%',
		height: '50%'
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
		color: Theme.COLORS.colorSecondary,
		// borderWidth: 1,
		// borderColor: Theme.COLORS.colorSecondary,
	},
	image: {
		// backgroundColor: 'red',
		position: 'absolute',
		// flex: 1,

		width: '100%',
		height: '100%'
	},
	overlay: {
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		position: 'absolute',
		// flex: 1,

		width: '100%',
		height: '100%'
	}
})

export default CommerceCategoriesScreen
