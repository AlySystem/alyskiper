import React, { useState, useReducer, useEffect } from 'react'
import {
    View,
    Image,
    TextInput,
    StyleSheet,
    ScrollView,
    Text,
    KeyboardAvoidingView,
    Dimensions,
    TouchableOpacity,
    Linking,
    Keyboard,
    BackHandler,
} from 'react-native'
import Background from '../../components/background/Background'
import { RFValue } from 'react-native-responsive-fontsize'
import { showMessage } from 'react-native-flash-message'
import validator from 'validator'
import IconEnt from 'react-native-vector-icons/Entypo'
import Modal from 'react-native-modal'

// Import Assets
import ImageBackground from '../../../assets/images/background-alymoney.png'
import ImageAlyPay from '../../../assets/images/alypay.png'
import BitCoinImage from '../../../assets/images/img-logo-bitcoin.png'

// Imports Graphql
import { useQuery } from '@apollo/react-hooks'
import { GETUSERWALLET } from '../../graphql/querys/Querys'
import { Theme } from '../../constants/Theme'
import { useSelector } from 'react-redux'

const { height, width } = Dimensions.get('window')

const ModalExit = React.memo(({ setVisible = () => { }, isVisible = false, goBack = () => { } }) => (
    <Modal backdropOpacity={0.9} animationIn="fadeIn" onBackButtonPress={() => setVisible(false)} isVisible={isVisible} style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image source={ImageAlyPay} style={styles.imageAly} />

        <Text style={stylesAskToLeave.titleError}>
            Estas apunto de salir ¿descartar cambios?
        </Text>

        <TouchableOpacity onPress={goBack} style={[stylesAskToLeave.buttonOk, { marginTop: 10 }]}>
            <Text style={stylesAskToLeave.textButtonOk}>
                Salir
            </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setVisible(false)} style={[stylesAskToLeave.buttonCancel, { marginTop: 10 }]}>
            <Text style={[stylesAskToLeave.titleError, { fontWeight: 'bold' }, { marginVertical: 0 }]}>
                Cancelar
            </Text>
        </TouchableOpacity>
    </Modal>
))

const TransferBalance = ({ navigation }) => {
    const [comprobateEmail, setComprobateEmail] = useState(false)
    const [writingPing, setWritingPin] = useState(false)
    const [alertExit, setAlertExit] = useState(false)
    const { email } = useSelector(storage => storage.user)
    const crypto = useSelector(storage => storage.crypto)
    console.log(crypto)

    // Form
    const [amount, setAmount] = useState('')
    const [emailSend, setEmailSend] = useState('')
    const [securityPin, setSecurityPin] = useState('')

    useQuery(GETUSERWALLET, {
        variables: {
            id: 708
        },
        partialRefetch: true,
        fetchPolicy: 'no-cache',
        onError: ({ message }) => {
            console.log(message)

            // Generalmente este error se ejecuta cuando el usuario no tiene wallet
            showMessage({
                message: 'Error',
                description: 'Ha ocurrido un error al obtener sus Crypto Monedas, contacte a soporte',
                backgroundColor: '#e67e22',
                color: '#fff',
                icon: 'danger'
            })
        },
        onCompleted: (data) => {
            console.log(data)
        }
    })

    // Envia el pin de seguridad al correo electronico
    const getPin = () => {
        setWritingPin(true)
        Keyboard.dismiss()

        showMessage({
            message: 'Skiper',
            description: `Hemos enviado el pin de seguridad, toca para abrir ${email}`,
            backgroundColor: '#27ae60',
            color: '#fff',
            icon: 'info',
            duration: 5000,
            onPress: () => {
                Linking.openURL(`mailto:${email}`)
            }
        })
    }

    // Comprueba la informacion del correo electronico
    const comprobateInfoByEmail = () => {
        Keyboard.dismiss()

        // Comprobamos si el correo es valido
        if (validator.isEmail(emailSend)) {
            setComprobateEmail(true)
        } else {
            // Generalmente este error se ejecuta cuando el usuario no tiene wallet
            showMessage({
                message: 'Skiper',
                description: 'El correo que has escrito no es correcto',
                backgroundColor: '#e67e22',
                color: '#fff',
                icon: 'danger'
            })
        }
    }

    const goBack = () => {
        navigation.goBack()
    }

    useEffect(() => {
        const backHandled = BackHandler.addEventListener('hardwareBackPress', () => {
            setAlertExit(true)

            return true
        })

        // Cuando el componente se desmonte
        return () => {
            backHandled.remove()
        }
    })

    return (
        <Background source={ImageBackground}>
            <ModalExit setVisible={setAlertExit} goBack={goBack} isVisible={alertExit} />

            <ScrollView style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} keyboardShouldPersistTaps="always">
                <Image source={ImageAlyPay} style={styles.imageAly} />

                <KeyboardAvoidingView style={styles.conatiner}>
                    <View style={[styles.rows, styles.rowCenter]}>
                        <Image source={{ uri: crypto.url_img }} style={styles.imageCoin} />
                        <Text style={styles.nameCoin}>{crypto.name}</Text>
                        <Text style={[styles.legendRow, { color: '#f1c40f' }]}>Saldo: 0.000540001</Text>
                    </View>

                    <View style={styles.rows}>
                        <View style={styles.subRow}>
                            <Text style={styles.legendRow}>Digite un monto a transferir</Text>
                        </View>

                        <TextInput
                            // editable={selectCrypto !== 0}
                            keyboardType="number-pad"
                            placeholderTextColor="#7f8c8d"
                            value={amount}
                            onChangeText={text => setAmount(text)}
                            style={styles.textInput}
                            placeholder="Monto a transferir" />
                    </View>

                    <View style={styles.rows}>
                        <Text style={styles.legendRow}>Digite el correo de destino</Text>

                        <TextInput
                            // editable={selectCrypto !== 0}
                            keyboardType="email-address"
                            placeholderTextColor="#7f8c8d"
                            value={emailSend}
                            onChangeText={text => setEmailSend(text)}
                            style={styles.textInput}
                            placeholder="Correo electronico" />
                    </View>

                    <View style={styles.rows}>
                        <TouchableOpacity style={styles.buttonComprobate} onPress={comprobateInfoByEmail}>
                            <IconEnt name="email" color={Theme.COLORS.colorSecondary} size={RFValue(14)} />
                            <Text style={styles.textButtonComprobate}>Comprobar correo electronico</Text>
                        </TouchableOpacity>
                    </View>

                    {
                        comprobateEmail &&
                        <>
                            <View style={styles.rows}>
                                <View style={styles.rowDescription}>
                                    <Text style={styles.descriptionKey}>Nombre</Text>
                                    <Text style={styles.descriptionValue}>Samuel Sobalvarro</Text>
                                </View>

                                <View style={styles.rowDescription}>
                                    <Text style={styles.descriptionKey}>Telefono</Text>
                                    <Text style={styles.descriptionValue}>+505 83805506</Text>
                                </View>

                                <View style={styles.rowDescription}>
                                    <Text style={styles.descriptionKey}>Pais</Text>
                                    <Text style={styles.descriptionValue}>Nicaragua</Text>
                                </View>
                            </View>

                            {
                                !writingPing &&
                                <>
                                    <View style={styles.rows}>
                                        <Text style={styles.paragraph}>
                                            Recibe un PIN de segurad en tu correo electronico para continuar la transaccion
                                    </Text>
                                    </View>

                                    <View style={styles.rows}>
                                        <TouchableOpacity style={styles.buttonComprobate} onPress={getPin}>
                                            <Text style={styles.textButtonPin}>Obtener PIN</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            }

                            {
                                writingPing &&
                                <>
                                    <View style={styles.rows}>
                                        <Text style={styles.legendRow}>Escribe el Pin de seguridad para continuar</Text>

                                        <TextInput
                                            // editable={selectCrypto !== 0}
                                            keyboardType="numeric"
                                            placeholderTextColor="#7f8c8d"
                                            value={securityPin}
                                            onChangeText={text => setSecurityPin(text)}
                                            style={styles.textInput}
                                            placeholder="PIN de seguridad" />

                                    </View>
                                    <View style={styles.rows}>
                                        <TouchableOpacity style={styles.buttonComprobate}>
                                            <Text style={styles.textButtonPin}>Enviar</Text>
                                        </TouchableOpacity>
                                    </View>
                                </>
                            }
                        </>
                    }

                </KeyboardAvoidingView>
            </ScrollView>
        </Background>
    )
}

/**Estilos de modal que se muesta cuando el usuario quiere salir */
const stylesAskToLeave = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: RFValue(24),
        color: '#FFF',
    },
    titleError: {
        fontSize: RFValue(18),
        marginVertical: 10,
        color: '#e74c3c',
        textAlign: 'center',
    },
    buttonOk: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c0392b',
        borderRadius: 10,
        padding: 10,
        marginTop: RFValue(50),
        width: '80%'
    },
    buttonCancel: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        borderRadius: 10,
        padding: 10,
        marginTop: RFValue(50),
        width: '80%'
    },
    textButtonOk: {
        color: '#FFF',
        fontSize: RFValue(18),
        fontWeight: 'bold',
    }
})

const styles = StyleSheet.create({
    imageAly: {
        alignSelf: 'center',
        height: RFValue(100),
        resizeMode: 'contain',
        width: RFValue(180),
    },
    conatiner: {
        // backgroundColor: 'red',
        alignSelf: 'center',
        minHeight: 500,
        width: '90%',
    },
    rows: {
        width: '100%',
        marginVertical: RFValue(10),
    },
    rowCenter: {
        alignItems: 'center',
    },
    subRow: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
    },
    imageCoin: {
        resizeMode: 'contain',
        height: RFValue(150),
        width: RFValue(150),
    },
    nameCoin: {
        color: '#FFF',
        fontSize: RFValue(24),
    },
    rowDescription: {
        paddingVertical: RFValue(10),
        borderBottomColor: Theme.COLORS.colorSecondary,
        borderBottomWidth: 1,
        justifyContent: 'space-between',
    },
    descriptionKey: {
        color: Theme.COLORS.colorSecondary,
        fontSize: RFValue(16),
        fontWeight: 'bold',
    },
    descriptionValue: {
        color: '#FFF',
        fontSize: RFValue(16),
    },
    legendRow: {
        color: '#FFF',
        fontSize: RFValue(16),
        marginBottom: RFValue(10),
    },
    picker: {
        backgroundColor: '#FFF',
    },
    textInput: {
        backgroundColor: Theme.COLORS.colorMainDark,
        borderWidth: 1,
        fontSize: RFValue(16),
        borderColor: Theme.COLORS.colorSecondary,
        borderRadius: 5,
        color: '#FFF',
        padding: RFValue(10),
        width: '100%',
    },
    textInputEmail: {
        backgroundColor: Theme.COLORS.colorMainDark,
        borderWidth: 1,
        fontSize: RFValue(16),
        flex: 1,
        borderColor: Theme.COLORS.colorSecondary,
        borderRadius: 5,
        color: '#FFF',
        padding: RFValue(10),
    },
    buttonComprobate: {
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: Theme.COLORS.colorMain + 'dd',
        borderRadius: 25,
        borderColor: Theme.COLORS.colorSecondary,
        borderWidth: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 10,
        width: '80%',
    },
    textButtonComprobate: {
        color: Theme.COLORS.colorSecondary,
        fontSize: RFValue(16),
        marginLeft: 10,
    },
    textButtonPin: {
        color: Theme.COLORS.colorSecondary,
        fontSize: RFValue(16),
        marginLeft: 10,
    },
    ContainerPicker: {
        backgroundColor: Theme.COLORS.colorMainDark,
        borderWidth: 1,
        borderColor: Theme.COLORS.colorSecondary,
        marginVertical: 15,
        borderRadius: 5,
        position: 'relative',
        width: '100%',
    },
    Picker: {
        color: '#FFF',
        paddingVertical: 5,
        paddingHorizontal: 10,
        width: '100%',
    },
    paragraph: {
        color: '#FFF',
        fontSize: RFValue(18),
        textAlign: 'center',
    }
})

export default TransferBalance