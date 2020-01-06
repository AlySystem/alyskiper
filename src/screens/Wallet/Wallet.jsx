import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useQuery } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'
import { showMessage } from 'react-native-flash-message'

// Import components
import Background from '../../components/background/Background'

// Import Assets
import ImageBackground from '../../../assets/images/background-alycoin.png'
import { GETUSERWALLET } from '../../graphql/querys/Querys'
import { Theme } from '../../constants/Theme'

const Wallet = () => {
    // Obtenemos el id del usuario de redux
    // const { userId } = useSelector(storage => storage.user)
    const userId = 637
    // const [data, setData] = useState({
    //     currencyID: {}
    // })

    // Ejecutamos la query
    const { loading, data } = useQuery(GETUSERWALLET, {
        variables: {
            id: userId
        },
        partialRefetch: true,
        onError: ({ message }) => {
            console.log(message)
            showMessage({
                message: 'Error',
                description: 'Ha ocurrido un error al obtener la Wallet, contacte a soporte',
                backgroundColor: '#e67e22',
                color: '#fff',
                icon: 'danger'
            })
        },
        // onCompleted: (dataResponse) => {
        //     if (dataResponse) {
        //         setData(dataResponse.GetUserWalletsCrypto.skiperWallet[0])
        //         console.log(dataResponse.GetUserWalletsCrypto.skiperWallet[0])
        //     } else {
        //         showMessage({
        //             message: 'Advertencia',
        //             description: 'No se ha encontrado wallet, contacte a soporte',
        //             backgroundColor: '#3498db',
        //             color: '#fff',
        //             icon: 'info'
        //         })
        //     }
        // }
    })

    console.log(data)

    // Estilos generales
    const Styles = StyleSheet.create({
        textTitle: {
            alignSelf: 'center',
            color: '#FFF',
            marginVertical: RFValue(25),
            fontSize: RFValue(24),
        },
        container: {
            alignItems: 'center'
        },
        row: {
            borderBottomColor: Theme.COLORS.colorSecondary,
            borderBottomWidth: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingVertical: RFValue(10),
            width: '80%',
        },
        textRow: {
            color: Theme.COLORS.colorSecondary,
            fontSize: RFValue(22)
        }
    })

    return (
        <Background source={ImageBackground}>
            <Text style={Styles.textTitle}>Wallet</Text>

            <View style={Styles.container}>
                {
                    (loading && !data)
                        ? <ActivityIndicator color="#FFF" size="large" />
                        : <>
                            <View style={Styles.row}>
                                <Text style={Styles.textRow}>Moneda</Text>
                                <Text style={Styles.textRow}>{data.GetUserWalletsCrypto.skiperWallet[0].currencyID.name}</Text>
                            </View>

                            <View style={Styles.row}>
                                <Text style={Styles.textRow}>Saldo</Text>
                                <Text style={Styles.textRow}>{data.GetUserWalletsCrypto.skiperWallet[0].amount_crypto}</Text>
                            </View>
                        </>
                }
            </View>
        </Background>
    )
}

export default Wallet