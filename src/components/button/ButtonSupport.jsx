import React, { useState } from 'react'
import {
    TouchableOpacity,
    Linking,
    Text,
    Image,
    StyleSheet,
    Keyboard
} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

// Import image whatsapp
import ImageWhatsapp from '../../../assets/images/img-support.png'

const ButtonWhatsapp = ({ xIndex: zIndex = 100, bottom = 0, right = 0 }) => {
    const [visible, setVisible] = useState(true)

    const Styles = StyleSheet.create({
        ButtonContainer: {
            position: 'absolute',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            bottom: bottom || 20,
            right: right || 20,
            zIndex,
        },
        Texts: {
            color: 'rgba(250, 250, 250, 0.8)',
            fontSize: RFValue(16),
            textShadowColor: 'rgba(0, 0, 0, 1)',
            textShadowOffset: {
                width: -1,
                height: 1
            },
            textShadowRadius: 10,
            marginRight: 10,
        },
        Image: {
            height: RFValue(50),
            width: RFValue(50),
        },
    })

    Keyboard.addListener('keyboardDidShow', () => {
        setVisible(false)
    })

    Keyboard.addListener('keyboardDidHide', () => {
        setVisible(true)
    })

    const OpenWhatsapp = () => Linking.openURL('whatsapp://send?phone=+50660727720')


    return (
        <>
            {
                visible &&
                <TouchableOpacity onPress={OpenWhatsapp} style={Styles.ButtonContainer}>
                    <Image style={Styles.Image} source={ImageWhatsapp} />

                    <Text style={Styles.Texts}>Soporte</Text>
                </TouchableOpacity>
            }
        </>
    )
}

export default ButtonWhatsapp