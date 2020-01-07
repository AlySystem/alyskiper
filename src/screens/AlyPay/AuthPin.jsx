import React, { useState } from 'react'
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity
} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import Icon from 'react-native-vector-icons/Fontisto'

// Import components
import { Theme } from '../../constants/Theme'

// Import Assets
import ImageAlyPay from '../../../assets/images/alypay.png'

// Import containers
import { showMessage } from 'react-native-flash-message'
import { useSelector } from 'react-redux'

const { height, width } = Dimensions.get('window')

const PinAuth = (props) => {
    const [security, setSecurity] = useState(true)
    const [pin, setPin] = useState('')

    const { email } = useSelector(x => x.user)
    /**Funcion que pide el pin de seguridad */
    const GetPin = () => {
        showMessage({
            message: 'Skiper',
            description: `Su pin de seguridad ha sido enviado correctamente a ${email}`,
            backgroundColor: '#16a085',
            color: '#fff',
            duration: 10000,
            icon: 'danger'
        })
    }

    /**Funcion que valida el pin del usuario con el del server */
    const validatePin = () => {
        const pinServer = '1234'

        if (pin === pinServer) {
            setSecurity(false)
        } else {
            showMessage({
                message: 'Skiper',
                description: `Su PIN de seguridad no es valido`,
                backgroundColor: '#c0392b',
                color: '#fff',
                duration: 3000,
                icon: 'warning'
            })
        }
    }

    if (security) {
        return (
            <KeyboardAvoidingView enabled behavior="padding" style={styles.screenLock}>
                <Icon name="wallet" color="#FFF" size={RFValue(50)} />
                <Image style={styles.imageAly} source={ImageAlyPay} />

                <Text style={styles.textLock}>
                    Para saber que eres el propietario de la cuenta,
                    necesitamos confirmar con un PIN de se seguridad que llegara a tu correo electronico.
                </Text>

                <TextInput
                    style={styles.inputPin}
                    onChangeText={str => setPin(str)}
                    returnKeyType="send"
                    onSubmitEditing={validatePin}
                    keyboardType="number-pad"
                    placeholder='Escribe tu pin de seguridad' />

                <View style={styles.containerButtons}>
                    <TouchableOpacity style={styles.buttons} onPress={GetPin}>
                        <Text style={styles.textButtons}>Recibir PIN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttons} onPress={validatePin}>
                        <Text style={styles.textButtons}>Confirmar</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>

        )
    } else {
        return null
    }

}

const styles = StyleSheet.create({
    imageAly: {
        alignSelf: 'center',
        height: RFValue(100),
        resizeMode: 'contain',
        width: RFValue(180),
    },
    screenLock: {
        alignItems: 'center',
        backgroundColor: Theme.COLORS.colorMain + 'cc',
        justifyContent: 'flex-start',
        paddingTop: '10%',
        height,
        position: 'absolute',
        width,
        zIndex: 1000,
    },
    containerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    buttons: {
        borderColor: Theme.COLORS.colorSecondary,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    textLock: {
        color: '#FFF',
        fontSize: RFValue(14),
        textAlign: 'center',
        width: '80%',
    },
    inputPin: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        marginVertical: RFValue(30),
        textAlign: 'center',
        width: '80%',
    },
    textButtons: {
        color: '#FFF',
        fontSize: RFValue(16)
    }
})

export default PinAuth
