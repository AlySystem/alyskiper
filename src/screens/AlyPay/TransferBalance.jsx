import React, { useState } from 'react'
import {
    View,
    Image,
    TextInput,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Text,
    KeyboardAvoidingView,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import Background from '../../components/background/Background'
import { RFValue } from 'react-native-responsive-fontsize'
import { showMessage } from 'react-native-flash-message'
import { Picker } from '@react-native-community/picker'
import IconEnt from 'react-native-vector-icons/Entypo'

// Import Assets
import ImageBackground from '../../../assets/images/background-alymoney.png'
import ImageAlyPay from '../../../assets/images/alypay.png'

// Imports Graphql
import { useQuery } from '@apollo/react-hooks'
import { GETUSERWALLET } from '../../graphql/querys/Querys'
import { Theme } from '../../constants/Theme'

const { height, width } = Dimensions.get('window')

const TransferBalance = () => {
    const [cryptos, setCryptos] = useState([])
    const [selectCrypto, setSelectCrypto] = useState(0)
    const [comprobateEmail, setComprobateEmail] = useState(false)

    const { loading: loadingWallet } = useQuery(GETUSERWALLET, {
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
            // console.log(data)
        }
    })


    return (
        <Background source={ImageBackground}>
            <ScrollView style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <Image source={ImageAlyPay} style={styles.imageAly} />

                <KeyboardAvoidingView behavior="height" style={styles.conatiner}>
                    {/* <TextInput /> */}
                    <View style={styles.rows}>
                        {/* {
                                (loadingWallet && cryptos.length === 0)
                                    ? <ActivityIndicator />
                                    : <Picker onChangeValue={(e) => console.log(e)} style={styles.picker} selectValue={selectCrypto}>

                                    </Picker>
                            } */}

                        <View style={styles.ContainerPicker}>
                            {/* <Text style={styles.legendRow}>Digite un monto a transferir</Text> */}
                            <Picker
                                selectedValue={selectCrypto}
                                style={styles.Picker}
                            // onValueChange={onValueChange}
                            >
                                <Picker.Item value={0} label="Seleccionar Moneda" />
                            </Picker>

                            <IconEnt name="select-arrows" size={RFValue(14)} color="#FFF" style={{ position: 'absolute', right: 10, top: 15 }} />
                        </View>
                    </View>

                    <View style={styles.rows}>
                        <Text style={styles.legendRow}>Digite un monto a transferir</Text>

                        <TextInput
                            // editable={selectCrypto !== 0}
                            keyboardType="number-pad"
                            placeholderTextColor="#7f8c8d"
                            // value={name}
                            // onChangeText={text => setName(text)}
                            style={styles.textInput}
                            placeholder="Monto a transferir" />
                    </View>

                    <View style={styles.rows}>
                        <Text style={styles.legendRow}>Digite el correo de destino</Text>

                        <TextInput
                            // editable={selectCrypto !== 0}
                            keyboardType="email-address"
                            placeholderTextColor="#7f8c8d"
                            // value={name}
                            // onChangeText={text => setName(text)}
                            style={styles.textInput}
                            placeholder="Correo electronico" />

                    </View>

                    <View style={styles.rows}>
                        <TouchableOpacity style={styles.buttonComprobate} onPress={() => setComprobateEmail(true)}>
                            <IconEnt name="email" color={Theme.COLORS.colorSecondary} size={RFValue(14)} />
                            <Text style={styles.textButtonComprobate}>Comprobar correo electronico</Text>
                        </TouchableOpacity>
                    </View>

                    {
                        comprobateEmail &&
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
                    }

                    <View style={styles.rows}>
                        <Text style={styles.paragraph}>
                            Recibe un PIN de segurad en tu correo electronico para continuar la transaccion
                        </Text>
                    </View>

                </KeyboardAvoidingView>
            </ScrollView>
        </Background>
    )
}

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
        borderRadius: 5,
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