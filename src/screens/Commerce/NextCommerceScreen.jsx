import React from 'react'
import {
    View,
    StyleSheet
} from 'react-native'

// Import components
import Background from '../../components/background/Background'

// Import containers
import ListOfSwiper from '../../containers/ListOfSwiper'

const NextCommerceScreen = props => {
    return (
        <Background>
            <View style={styles.screen}>
                <View style={styles.card}>
                    <ListOfSwiper />
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
        marginVertical: 12
    }
})

export default NextCommerceScreen
