import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useQuery } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'
import { showMessage } from 'react-native-flash-message'

// Import components
import Background from '../../components/background/Background'

// Import Apollo query
import { GETUSERWALLET } from '../../graphql/querys/Querys'

// Import Assets
import ImageBackground from '../../../assets/images/background-alymoney.png'
import ImageAlyPay from '../../../assets/images/alypay.png'
import { Theme } from '../../constants/Theme'

const DetailsCrypto = () => {
    // Obtenemos el id del usuario de redux
    // const { userId } = useSelector(storage => storage.user)
    const userId = 637

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
        }
    })

    // Estilos generales
    const Styles = StyleSheet.create({
        imageAly: {
            alignSelf: 'center',
            height: RFValue(100),
            resizeMode: 'contain',
            width: RFValue(180),
        },
        container: {
            alignItems: 'center'
        },
        containerButtons: {
            alignSelf: 'center',
            flex: 1,
            marginTop: RFValue(20),
            marginBottom: RFValue(20),
            width: '80%',
            justifyContent: 'space-between',
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
        },
        buttons: {
            backgroundColor: Theme.COLORS.colorMain,
            borderColor: 'blue',
            borderWidth: 1,
            borderRadius: 5,
            paddingVertical: RFValue(10),
            paddingHorizontal: RFValue(15),
            borderRadius: 25,
            marginBottom: 15,
            // width: '65%'
        },
        buttonsText: {
            color: Theme.COLORS.colorSecondary,
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: RFValue(12),
            textTransform: 'uppercase',
        },
        buttonRetirement: {
            backgroundColor: Theme.COLORS.colorMain,
            borderRadius: 25,
            paddingVertical: RFValue(10),
            paddingHorizontal: RFValue(15),
        },
        buttonRetirementText: {
            color: Theme.COLORS.colorSecondary,
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: RFValue(12),
            textTransform: 'uppercase',
        }
    })

    return (
        <Background source={ImageBackground}>
            <Image style={Styles.imageAly} source={ImageAlyPay} />

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

            <View style={Styles.containerButtons}>
                <View>
                    <TouchableOpacity style={Styles.buttons}>
                        <Text style={Styles.buttonsText}>Comprar paquetes de monedas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={Styles.buttons}>
                        <Text style={Styles.buttonsText}>Enviar monedas</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={Styles.buttons}>
                    <Text style={Styles.buttonRetirementText}>Hacer retiros</Text>
                </TouchableOpacity>
            </View>
        </Background>
    )
}

export default DetailsCrypto