import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

// Import Assets
import ImageAlyPay from '../../../assets/images/alypay.png'
import Alyskiper from '../../../assets/images/img-alyskiper.png'
import { Theme } from '../../constants/Theme'

const CommingSoon = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.imageAly} source={Alyskiper} />
            <Image style={styles.imageAly} source={ImageAlyPay} />

            <Text style={styles.text}>
                Proximamente
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: Theme.COLORS.colorMain + 'cc',
        justifyContent: 'center',
        paddingTop: '10%',
        height: '100%',
        position: 'absolute',
        width: '100%',
        zIndex: 1000,
    },
    imageAly: {
        alignSelf: 'center',
        height: RFValue(100),
        resizeMode: 'contain',
        width: RFValue(180),
    },
    text: {
        color: '#FFFFFF',
        fontSize: RFValue(42),
    }
})

export default CommingSoon