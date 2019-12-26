import React, { useState } from 'react'
import {
    View,
    StyleSheet,
    ScrollView,
    Image,
    ActivityIndicator
} from 'react-native'

// Import components
import Background from '../../components/background/Background'
import Title from '../../components/title/Title'
import Promotion from '../../components/promotion/Promotion'

// Import containers
import ListOfSwiper from '../../containers/ListOfSwiper'

// Import theme
import { Theme } from '../../constants/Theme'
import { RFValue } from 'react-native-responsive-fontsize'

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

const NextCommerceScreen = (navigation) => {
    const [loading, setLoading] = useState(true)

    return (
        <Background>
            <ScrollView>
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

                    <View style={{ marginVertical: 0, alignItems: 'center', paddingVertical: 10 }}>
                        {
                            loading &&
                            <ActivityIndicator size="large" color="#FFF" />
                        }

                        <Image
                            onLoadEnd={() => setLoading(false)}
                            style={{
                                resizeMode: 'contain',
                                width: '100%',
                                height: RFValue(300)
                            }}
                            source={{ uri: navigation.navigation.state.params.image }} />
                    </View>
                </View>
            </ScrollView>
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
