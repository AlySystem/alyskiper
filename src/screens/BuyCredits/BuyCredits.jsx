import React, { useState, useEffect } from 'react'
import {
    View,
    ImageBackground,
    Image,
    Dimensions,
    Text,
    TouchableOpacity,
    ScrollView,
    Modal,
    Alert,
    TextInput,
    TouchableHighlight,
    Clipboard,
    ToastAndroid,
    StyleSheet,
} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import Icon from 'react-native-vector-icons/MaterialIcons'
import QRCode from 'react-native-qrcode'
import moment from 'moment'

const COLORS = {
    colorMain: '#000024',
    colorMainDark: '#000018',
    colorSecondary: '#03F9FC',
    colorSecondaryTransparent: 'rgba(0, 0, 24, 0.8)',
    colorSecondaryTransparentAlt: 'rgba(0, 0, 24, 0.65)',
    colorParagraph: '#E4E4E4',
    colorParagraphSecondary: '#C9C9C9',
    colorUnderline: 'rgba(28,117,227,0.98)',
    colorInput: '',
    colorTextError: 'red',
    colorSucces: '#097302',
    colorInfo: '#018FB3',
    colorWarning: '#fdbe00',
    colorError: 'red',
    colorErrorTransparent: 'rgba(191,5,30, .6)'
}

const { height, width } = Dimensions.get('window')

const DEFAULT = 'default'

const CoinsComponent = ({ data, onClick }) => {
    const { image, value } = data

    return (
        <TouchableOpacity onPress={onClick} style={{
            backgroundColor: COLORS.colorSecondaryTransparentAlt,
            borderColor: 'blue',
            elevation: 20,
            borderRadius: 10,
            borderWidth: 2,
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            marginBottom: 25,
            width: '80%',
        }}>
            <View style={{
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: 25
            }}>
                <Image style={{ width: RFValue(100), height: RFValue(100), resizeMode: 'contain', marginLeft: 10 }} source={image} />
                <Text style={{ color: '#FFF', marginTop: 10, fontSize: RFValue(18) }}>$ {Number(value).toFixed()}</Text>
            </View>

            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.colorMain,
                borderColor: 'blue',
                borderRadius: 5,
                padding: 5,
                flexDirection: 'row',
                borderWidth: 1,
                width: '80%'
            }}>
                <Text style={{ color: COLORS.colorSecondary }}>Seleccionar paquete</Text>
                <Icon name='chevron-right' color={COLORS.colorSecondary} size={RFValue(24)} />
            </View>
        </TouchableOpacity>
    )
}

const BuyCredits = () => {
    const [amount, setAmount] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [showModaConfirm, setShowModalConfirm] = useState(false)
    const [payMode, setPayMode] = useState(DEFAULT)
    const [wallet, setWallet] = useState('19mVxVS3hKbC3XLgjRJg1MECgrHTFbCvhz')
    const [numBill, setNumBill] = useState('500')
    const [state, setState] = useState('Pendiente')
    const [username, setUsername] = useState('Samuel')
    const [TimeExpiration, setTimeExpiration] = useState('15: 00')
    const [packageSelect, setPackageSelect] = useState(null)

    // require('../../../assets/images/coins')
    const data = [
        {
            image: require('../../../assets/images/coins/15.png'),
            value: 15
        },
        {
            image: require('../../../assets/images/coins/50.png'),
            value: 50
        },
        {
            image: require('../../../assets/images/coins/100.png'),
            value: 100
        },
        {
            image: require('../../../assets/images/coins/250.png'),
            value: 250
        },
        {
            image: require('../../../assets/images/coins/500.png'),
            value: 500
        },
        {
            image: require('../../../assets/images/coins/100.png'),
            value: 1000
        },
    ]

    const payData = [
        {
            label: 'Bitcoin extenal wallet',
            value: 'btc',
        },
        {
            value: 'ltc',
            label: 'Litecoin extenal wallet',
        },
        {
            value: 'dash',
            label: 'Dash extenal wallet',
        },
        {
            value: 'eth',
            label: 'Ethereum extenal wallet',
        },
    ]

    let countDown = null

    const setBack = () => {
        clearInterval(countDown)
        setTimeExpiration('15: 00')
        setShowModal(true)
        setShowModalConfirm(false)
    }

    const AlertExpiration = () => {
        Alert.alert(
            'Tiempo vencido',
            'El tiempo para confirmar factura se ha vencido',
            [
                {
                    onPress: setBack,
                    style: 'default',
                    text: 'Ok'
                }
            ]
        )
    }

    const openBill = () => {
        if (payMode !== DEFAULT) {
            // Show second Modal
            setShowModalConfirm(true)
            
            // Hidden first Modal
            setShowModal(false)

            const eventTime = moment().add(1, 'minutes').unix()
            const currentTime = moment().unix()
            const diffTime = eventTime - currentTime

            let duration = moment.duration(diffTime * 1000, 'milliseconds')


            countDown = setInterval(
                async () => {
                    duration = moment.duration(duration.asMilliseconds() - 1000, 'milliseconds');
                    const minutes = moment.duration(duration).minutes()
                    const seconds = moment.duration(duration).seconds()


                    setTimeExpiration(`${minutes}: ${seconds}`)

                    if (minutes === 0 && seconds === 0) {
                        AlertExpiration()
                    }
                },
                1000
            )


            

        } else {
            Alert.alert(
                'Seleccione un metodo de pago',
                'Para continuar, debe seleccionar un metodo de pago',
                [
                    {
                        onPress: () => { },
                        text: 'Ok',
                        style: 'default'
                    }
                ]
            )
        }
    }

    return (
        <ImageBackground
            style={{
                width,
                height,
                // backgroundColor: COLORS.colorMainDark,
                flex: 1,
            }} source={require('../../../assets/images/img-background.png')}>

            <Modal animationType="fade" transparent visible={showModal}>

                <View style={{
                    backgroundColor: COLORS.colorSecondaryTransparent,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    width: '100%',
                }}>
                    <TouchableOpacity style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                    }} onPress={() => setShowModal(false)}>
                        <Icon color={COLORS.colorSecondary} size={RFValue(36)} name="close" />
                    </TouchableOpacity>

                    <View style={{
                        // alignItems: 'center',
                        backgroundColor: COLORS.colorSecondaryTransparent,
                        padding: 10,
                        justifyContent: 'center',
                        elevation: 20,
                        width: '80%',
                    }}>

                        <Text style={{ color: '#FFF', fontSize: RFValue(24), textAlign: 'center' }}>Metodo de pago</Text>

                        <View style={{ marginVertical: 20 }}>
                            {
                                payData.map(
                                    ({ value, label }, index = 0) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={{
                                                backgroundColor: payMode === value ? 'rgba(150, 150, 150, 0.12)' : '#070122',
                                                borderColor: 'blue',
                                                borderWidth: 1,
                                                padding: 10,
                                                marginVertical: 5,
                                                borderRadius: 5,
                                                justifyContent: 'space-between',
                                                flexDirection: 'row',
                                                // width: '80%',
                                            }}
                                            onPress={() => setPayMode(value)}>
                                            <Text style={{
                                                color: COLORS.colorSecondary,
                                                fontSize: RFValue(14)
                                            }}>{label}</Text>

                                            {
                                                payMode === value &&
                                                <Icon color={COLORS.colorSecondary} name="check" size={RFValue(18)} />
                                            }
                                        </TouchableOpacity>
                                    )
                                )
                            }
                        </View>

                        <TouchableOpacity
                            onPress={openBill}
                            style={{
                                padding: 5,
                                borderColor: 'blue',
                                borderWidth: 2,
                                borderRadius: 25,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text style={{ color: '#FFF', marginRight: 10, textAlign: 'center', fontSize: RFValue(18) }}>Generar Orden</Text>

                            <Icon color='#FFF' name="arrow-forward" size={RFValue(18)} />
                        </TouchableOpacity>

                    </View>

                </View>
            </Modal>

            <Modal animationType="fade" transparent visible={showModaConfirm}>

                <View style={{
                    backgroundColor: COLORS.colorSecondaryTransparent,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    width: '100%',
                }}>

                    <View style={{
                        // alignItems: 'center',
                        backgroundColor: COLORS.colorSecondaryTransparent,
                        paddingVertical: 10,
                        paddingBottom: 50,
                        paddingHorizontal: '5%',
                        // justifyContent: 'center',
                        elevation: 20,
                        height: '100%',
                        width: '100%',
                    }}>

                        <ScrollView style={{
                            paddingBottom: 20,
                            overflow: 'visible',
                        }}>
                            <TouchableOpacity style={{}} onPress={setBack}>
                                <Icon color={COLORS.colorSecondary} size={RFValue(36)} name="arrow-back" />
                            </TouchableOpacity>

                            <View style={{
                                marginTop: 25,
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    marginVertical: 20,
                                    borderBottomColor: COLORS.colorSecondary,
                                    borderBottomWidth: 1,
                                    padding: 10,
                                    paddingBottom: 10,
                                    marginBottom: 25,
                                    // borderLeftColor: COLORS.colorSecondary,
                                    // borderLeftWidth: 4,
                                    width: '100%',
                                }}>
                                    <Text style={{
                                        color: '#FFF',
                                        fontSize: RFValue(18)
                                    }}>ORDEN: #{numBill}</Text>
                                </View>

                                <View style={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                    width: '100%',
                                    // marginTop: 25,
                                    // padding: 10,
                                }}>
                                    <View style={styleRow.row}>
                                        <Text style={styleRow.textRow}>No. Factura:</Text>
                                        <Text style={styleRow.textRow}>{numBill}</Text>
                                    </View>

                                    <View style={styleRow.row}>
                                        <Text style={styleRow.textRow}>Estado:</Text>
                                        <Text style={styleRow.textRow}>{state}</Text>
                                    </View>

                                    <View style={styleRow.row}>
                                        <Text style={styleRow.textRow}>Nombre de usuario:</Text>
                                        <Text style={styleRow.textRow}>{username}</Text>
                                    </View>

                                    <View style={styleRow.row}>
                                        <Text style={styleRow.textRow}>Moneda:</Text>
                                        <Text style={styleRow.textRow}>{payMode}</Text>
                                    </View>

                                    <View style={styleRow.row}>
                                        <Text style={styleRow.textRow}>Forma de pago:</Text>
                                        <Text style={styleRow.textRow}>{payMode.toUpperCase()}</Text>
                                    </View>

                                    <View style={styleRow.row}>
                                        <Text style={styleRow.textRow}>Tiempo de vencimiento:</Text>
                                        {/* <Text style={styleRow.textRow}>15: 00</Text> */}
                                        <Text style={styleRow.textRow}>{TimeExpiration}</Text>
                                    </View>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    width: '100%',
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-end'
                                }}>
                                    <View style={styleRow.row}>
                                        <Text style={styleRow.textRow}>Total a pagar:</Text>
                                        <Text style={styleRow.textRow}>${
                                            packageSelect ? packageSelect.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0
                                        }</Text>
                                    </View>
                                </View>

                                <View style={{
                                    paddingBottom: 10,
                                    marginBottom: 30,
                                    flexDirection: 'row',
                                    width: '100%',
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-end'
                                }}>
                                    <TouchableOpacity style={{
                                        backgroundColor: 'red',
                                        padding: 10,
                                        borderRadius: 5,
                                    }}>
                                        <Text style={{ fontSize: RFValue(14), color: '#FFF' }}>Cancelar Factura</Text>
                                    </TouchableOpacity>
                                </View>

                                <QRCode
                                    value={wallet}
                                    size={RFValue(120)}
                                    bgColor='white'
                                    fgColor="black" />

                                <Text
                                    onPress={
                                        () => {
                                            Clipboard.setString(amount.toString())
                                            ToastAndroid.show('Copiado', ToastAndroid.SHORT)
                                        }
                                    }
                                    style={{
                                        // borderBottomColor: COLORS.colorSecondary,
                                        // borderBottomWidth: 1,
                                        // paddingBottom: 10,
                                        color: '#FFF',
                                        fontSize: RFValue(18),
                                        textAlign: 'center',
                                        marginVertical: 25,
                                        width: '100%'
                                    }}>
                                    Moto a pagar {payMode.toUpperCase()} <Text style={{ color: COLORS.colorSecondary, marginLeft: 15 }}>{amount.toFixed(11)}</Text>
                                </Text>

                                <View style={{
                                    borderColor: COLORS.colorSecondary,
                                    flexDirection: 'row',
                                    marginTop: 20,
                                }}>
                                    <TextInput
                                        style={{
                                            color: '#000',
                                            backgroundColor: '#FFF'
                                        }}
                                        editable={false}
                                        defaultValue={wallet} />

                                    <TouchableHighlight
                                        style={{
                                            alignItems: 'center',
                                            borderRadius: 5,
                                            borderColor: COLORS.colorSecondary,
                                            borderWidth: 1,
                                            justifyContent: 'center',
                                            marginLeft: 10,
                                            flexDirection: 'row',
                                            paddingHorizontal: 10,
                                        }}
                                        onPress={
                                            () => {
                                                Clipboard.setString(wallet)
                                                ToastAndroid.show('Copiado', ToastAndroid.SHORT)
                                            }
                                        }>
                                        <>
                                            <Text style={{ color: COLORS.colorSecondary }}>Copiar</Text>
                                            <Icon name="content-copy" color={COLORS.colorSecondary} size={RFValue(14)} />
                                        </>
                                    </TouchableHighlight>
                                </View>

                                <View style={{ marginVertical: 20 }}>
                                    <Text style={{ fontSize: RFValue(16), textAlign: 'center', color: '#FFF' }}>
                                        El hash es un identificador único de cada transacción enviada.
                                    </Text>
                                    <Text style={{ fontSize: RFValue(10), textAlign: 'center', color: '#FFF' }}>
                                        (Puedes encontrarla con varios nombres segun su wallet por ejemplo: Transaction id, Hash o TXID)
                                    </Text>
                                </View>

                                <View style={{
                                    width: '100%'
                                }}>
                                    <TextInput style={styleRow.inputs} placeholder='Ingrese el HASH de confirmacion' />
                                    <TextInput style={styleRow.inputs} placeholder='Wallet de Alycoin' />

                                </View>

                                <View style={{
                                    borderBottomColor: COLORS.colorSecondary,
                                    borderBottomWidth: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    paddingBottom: 20,
                                    width: '100%',
                                }}>
                                    <TouchableHighlight style={styleRow.buttons}>
                                        <Text style={styleRow.textButtons}>Enviar</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </ScrollView>

                    </View>

                </View>
            </Modal>



            <ScrollView>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: 25,
                    width: '100%',
                }}>
                    <Text
                        style={{
                            fontSize: RFValue(24),
                            color: '#FFF',
                            textAlign: 'center'
                        }}>
                        Paquetes de recarga
                    </Text>

                </View>


                <View>
                    <Text>Seleccionar paquete</Text>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        {
                            data.reverse().map(
                                (item, index) => <CoinsComponent
                                    data={item}
                                    onClick={
                                        () => {
                                            setShowModal(true)

                                            setPackageSelect(item)
                                        }
                                    }
                                    key={index} />
                            )
                        }
                    </View>
                </View>
            </ScrollView>

        </ImageBackground>
    )
}

const styleRow = StyleSheet.create({
    row: {
        borderBottomColor: COLORS.colorSecondary,
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 15,
        paddingBottom: 5,
        width: '100%'
    },
    textRow: {
        color: '#FFF',
        fontSize: RFValue(16)
    },
    inputs: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        marginVertical: 10,
        width: '100%',
    },
    buttons: {
        borderColor: COLORS.colorSecondary,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    textButtons: {
        color: '#FFF',
        fontSize: RFValue(16)
    }
})

export default BuyCredits