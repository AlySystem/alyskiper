import React from 'react'
import {
    View,
    StyleSheet,
    ScrollView,
    Text
} from 'react-native'

// Import components
import Background from '../../components/background/Background'
import Title from '../../components/title/Title'
import Promotion from '../../components/promotion/Promotion'

// Import containers
import ListOfSwiper from '../../containers/ListOfSwiper'

// Import theme
import { Theme } from '../../constants/Theme'

const items = [
    {
        key: 1,
        img: 'https://storage.googleapis.com/app_user_bucket/apie.jpg'
    },
    {
        key: 2,
        img: 'https://storage.googleapis.com/app_user_bucket/bici.jpg'
    },
    {
        key: 3,
        img: 'https://storage.googleapis.com/app_user_bucket/moto.jpg'
    },
    {
        key: 4,
        img: 'https://storage.googleapis.com/app_user_bucket/taxi.jpg'
    }
]

const NextCommerceScreen = props => {
    return (
        <Background>
            <View style={styles.screen}>
                <View style={styles.card}>
                    <ListOfSwiper />
                </View>
                <View style={styles.container}>
                    <Title
                        title='Promociones'
                        styles={styles.title}
                    />
                    <ScrollView horizontal keyboardShouldPersistTaps='always'>
                        {items.map((item, index) => (
                            <Promotion
                                key={index}
                                source={{ uri: item.img }}
                            />
                        ))}
                    </ScrollView>
                </View>

                <View style={{ marginVertical: 25, alignItems: 'center', paddingVertical: 10, backgroundColor: 'rgba(250, 250, 250, 0.1)' }}>
                    <Text
                        style={{
                            color: '#FFF',
                            fontSize: 44,
                        }}>
                        Proximamente
                    </Text>
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
    card: {
        height: 230,
        marginVertical: 0
    },
    title: {
        color: Theme.COLORS.colorSecondary,
        fontSize: Theme.SIZES.title,
        fontFamily: 'Lato-Bold'
    }
})

export default NextCommerceScreen
