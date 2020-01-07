import React, { useState, useEffect } from 'react'
import {
	View,
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
	ActivityIndicator,
} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useSelector } from 'react-redux'
import QRCode from 'react-native-qrcode-svg'
import moment from 'moment'
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'
import jwt_decode from 'jwt-decode'
import Ip from 'react-native-public-ip'
import { StackActions } from 'react-navigation'

// Import components
import Background from '../../components/background/Background'

// Import Assets
import ImageBackground from '../../../assets/images/background-alymoney.png'
import ImageAlyPay from '../../../assets/images/alypay.png'

// Import Queries and mutation
import { GetPackage, GetAmountByCrypto } from '../../graphql/querys/Querys'
import { ValidateHash } from '../../graphql/mutations/Mutations'
import { showMessage } from 'react-native-flash-message'

let countDown = null

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

const DEFAULT = 'bitcoin'

const CoinsComponent = React.memo(({ data, onClick }) => {
	const { img_url, name, price } = data
	const [loading, setLoading] = useState(true)

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
				{
					(loading) && <ActivityIndicator size="small" color='#FFF' />
				}
				<Image
					onLoadEnd={() => setLoading(false)}
					style={{
						width: RFValue(100),
						height: RFValue(100),
						resizeMode: 'contain',
						marginLeft: 10
					}}
					source={{ uri: img_url }} />
				<Text style={{ color: '#FFF', marginTop: 10, fontSize: RFValue(22) }}>{name}</Text>
				<Text style={{ color: '#EEE', marginTop: 10, fontSize: RFValue(18) }}>$ {Number(price).toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
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
})

const BuyCredits = (props) => {

	/**Este es el moto representado en cripto monedas */
	const [amount, setAmount] = useState(0)

	/**Mostar la segunda modal, para mostar la factura  */
	const [ShowBill, setShowBill] = useState(false)

	/**Representa el tipo de moneda */
	const [payMode, setPayMode] = useState(DEFAULT)

	/**Numero de cuenta wallet */
	const [wallet, setWallet] = useState('')

	/**Numero de factura */
	const [numBill, setNumBill] = useState('')

	/**Estado de la factura */
	const [state, setState] = useState(false)

	/**Nombre de usuario */
	const [username, setUsername] = useState('')

	/**correo electronico de destino */
	const [emailTo, setEmailTo] = useState('')

	/**contiene el hash de confirmacion, esto se ocupara cuando se envie el formulario */
	const [hash, setHash] = useState('')

	/**Timpo de expiracion  de la factura */
	const [TimeExpiration, setTimeExpiration] = useState('15:00')

    /**
     * El paquete seleccionado (Paquete gold - $1000, etc..)
     * id: `Int`
     * img_url: `String`
     * name: `String`
     * price: `Float`
     * */
	const [packageSelect, setPackageSelect] = useState(null)

	/**Los datos que representaran todos los paquetes */
	const [data, setData] = useState([])

	const [publicIp, setPublicIp] = useState('')

	/**Los datos para manejar la peticion de los pquetes */
	const { loading, data: dataPackage, error: errorQuery } = useQuery(GetPackage, { partialRefetch: true })

	/**Preparamos la peticion de Graphl para ejecutarla, estos datos seran preparados para la factura */
	const [_getAmountByCrypto, { loading: loadingGetAmount }] = useLazyQuery(GetAmountByCrypto, {
		onError: err => {
			Alert.alert(
				'Error',
				err.message,
				[
					{
						text: 'Ok',
						style: 'default',
						onPress: () => { }
					}
				]
			)
		},
		onCompleted: ({ getAmountByCrypto }) => {
			if (getAmountByCrypto) {
				// Set cripto amount
				setAmount(getAmountByCrypto.amounSend)

				// set user name
				setUsername(getAmountByCrypto.nameUser)

				// set wallet
				setWallet(getAmountByCrypto.walletReceive)

				// set bill number
				setNumBill(getAmountByCrypto.numberFact)

				// set bill state
				setState(getAmountByCrypto.state)

				// set email destino
				setEmailTo(email)
			} else {
				Alert.alert(
					'Error',
					'Error al obtener datos de monto',
					[
						{
							text: 'Ok',
							onPress: () => { },
							style: 'default'
						}
					]
				)
			}
		}
	})

	/**Obetenemos el token, la ciudad de redux */
	const { userToken, country_id, email } = useSelector(x => x.user)

	/**Obtenemos la Posicion */
	const { latitude, longitude } = useSelector(x => x.location)

	/**Cargando los datos mientras se ejecuta la factura */
	const [loadingBill, setLoadingBill] = useState(false)

	const [validateHash, { loading: loadingHash }] = useMutation(ValidateHash, {
		onError: (err) => {
			console.log(err)

			Alert.alert(
				'Error al validar hash',
				err.message,
				[
					{
						text: 'Ok',
						onPress: () => { },
						style: 'default'
					}
				]
			)
		},
		onCompleted: ({ validateHash }) => {
			if (validateHash) {
				Alert.alert(
					'Transaccion realizada',
					'Su recarga ha sido exitosa',
					[
						{
							text: 'Ok',
							onPress: () => {
								setBack()
								const popAction = StackActions.pop({ n: 1 })

								props.navigation.dispatch(popAction)
							},
							style: 'default'
						}
					]
				)
			} else {
				Alert.alert(
					'Error al completar compra',
					'Se ha producido un error al completar compra, intente de nuevo',
					[
						{
							text: 'Ok',
							onPress: () => { },
							style: 'default'
						}
					]
				)
			}
		}
	})

	/**a la escucha cuando termine el loading de los datos de cripto monedas */
	useEffect(
		() => {
			if (errorQuery) {
				console.log(errorQuery)
			} else if (dataPackage) {
				setData(dataPackage.GetPackages.reverse())
			}
		}, [loading]
	)

	/**Cuando el componente se renderice, obtenemos la ip publica */
	useEffect(
		() => {
			// Obtenemos la ip
			Ip().then(ip => setPublicIp(ip)).catch(() => { })


			return () => {
				clearInterval(countDown)
			}
		}, []
	)

	/**Funcion que ejecuta el proceso de atras, en la modal factura */
	const setBack = () => {
		clearInterval(countDown)
		setTimeExpiration('15:00')
		setShowBill(false)
	}

	/**Alerta que se ejecuta cuando se expira el tiempo de facturacion */
	const AlertExpiration = () => {
		setBack()

		if (ShowBill) {
			Alert.alert(
				'Tiempo vencido',
				'El tiempo para confirmar factura se ha vencido',
				[
					{
						onPress: () => { },
						style: 'default',
						text: 'Ok'
					}
				]
			)
		}
	}

	/**Abre la ventana de la factura */
	const openBill = async ({ id, price }) => {
		if (payMode !== 'default') {
			// decode token
			setLoadingBill(true)
			const { sub } = jwt_decode(userToken)

			const variables = {
				crypto: payMode,
				amount: price,
				iduser: sub,
				idcountry: country_id,
				idpackage: id,
			}

			// Execute funcition mutation
			await _getAmountByCrypto({ variables })

			// *-*-*-*-*-*-*-*-*-*-**-*--*-*-*-*-*-*-*
			// configuration to open the invoice

			// Show second Modal
			setShowBill(true)

			const eventTime = moment().add(15, 'minutes').unix()
			const currentTime = moment().unix()
			const diffTime = eventTime - currentTime
			let duration = moment.duration(diffTime * 1000, 'milliseconds')

			countDown = setInterval(
				async () => {
					duration = moment.duration(duration.asMilliseconds() - 1000, 'milliseconds');
					const minutes = moment.duration(duration).minutes()
					const seconds = moment.duration(duration).seconds()


					setTimeExpiration(`${minutes}:${seconds}`)

					// Verificamos cuando se acaba el tiempo de vencimiento
					if (minutes === 0 && seconds === 0) {
						AlertExpiration()
						clearInterval(countDown)
						return
					}
				},
				1000
			)

			// // *-*-*-*--*--*-*-*-**-**-*-**--*-*-*-*-*-*-

			setLoadingBill(false)

		} else {

			showMessage({
				message: 'Seleccione un metodo de pago',
				description: 'Para continuar, debe seleccionar un metodo de pago',
				backgroundColor: '#e67e22',
				color: '#fff',
				icon: 'warning',
			})
		}
	}

	/**Envia el formulario con los datos */
	const submit = () => {
		if (hash.length > 10) {
			const variables = {
				hash,
				crypto: payMode,
				total_real: packageSelect.price,
				total_crypto: amount,
				lat: latitude,
				long: longitude,
				ip: publicIp,
				email: emailTo
			}

			console.log(variables)

			return

			validateHash({ variables })
		} else {
			Alert.alert(
				'Ingrese hash',
				'Ingrese un codigo Hash para continuar',
				[
					{
						text: 'Ok',
						onPress: () => { },
						style: 'default'
					}
				]
			)
		}
	}

	/**Funcion que cancela la factura, esta accion es ejecutado del boton  */
	const cancellBill = () => {
		Alert.alert(
			'Cancelar Factura',
			'Los datos se perderan',
			[
				{
					text: 'Cerrar',
					onPress: () => { }
				},
				{
					text: 'Continuar',
					onPress: () => {
						clearInterval(countDown)
						setTimeExpiration('15:00')
						setShowBill(false)

						setTimeout(() => {
							showMessage({
								message: 'Skiper',
								description: 'Su factura fue cancelada',
								backgroundColor: '#e67e22',
								color: '#fff',
								icon: 'info'
							})
						}, 1000)
					}
				}
			]
		)
	}

	return (
		<Background source={ImageBackground}>
			<Modal onDismiss={() => clearInterval(countDown)} animationType="fade" transparent visible={ShowBill}>

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
						paddingHorizontal: '4%',
						// justifyContent: 'center',
						elevation: 20,
						height: '100%',
						width: '100%',
					}}>

						<ScrollView style={{ paddingBottom: 20, overflow: 'visible' }}>
							<TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={setBack}>
								<Icon color={COLORS.colorSecondary} size={RFValue(36)} name="close" />
							</TouchableOpacity>

							<View style={{ marginTop: 25, alignItems: 'center' }}>
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
									<Text style={{ color: '#FFF', fontSize: RFValue(18) }}>
										ORDEN: #{numBill}
									</Text>
								</View>

								<View style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', width: '100%' }}>
									<View style={styleRow.row}>
										<Text style={styleRow.textRow}>No. Factura:</Text>
										<Text style={styleRow.textRow}>{numBill}</Text>
									</View>

									<View style={styleRow.row}>
										<Text style={styleRow.textRow}>Estado:</Text>
										<Text style={styleRow.textRow}>{state ? 'Finalizada' : 'Pendiente'}</Text>
									</View>

									<View style={styleRow.row}>
										<Text style={styleRow.textRow}>Nombre de usuario:</Text>
										<Text style={styleRow.textRow}>{username}</Text>
									</View>

									<View style={styleRow.row}>
										<Text style={styleRow.textRow}>Forma de pago:</Text>
										<Text style={styleRow.textRow}>{payMode.toUpperCase()}</Text>
									</View>

									<View style={styleRow.row}>
										<Text style={styleRow.textRow}>Tiempo de vencimiento:</Text>
										<Text style={styleRow.textRow}>{TimeExpiration}</Text>
									</View>
								</View>

								<View style={{ flexDirection: 'row', width: '100%', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
									<View style={styleRow.row}>
										<Text style={styleRow.textRow}>Total a pagar:</Text>
										<Text style={styleRow.textRow}>${
											packageSelect ? packageSelect.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0
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
									<TouchableOpacity
										style={{ backgroundColor: 'red', padding: 10, borderRadius: 5 }}
										onPress={cancellBill}>
										<Text style={{ fontSize: RFValue(14), color: '#FFF' }}>Cancelar Factura</Text>
									</TouchableOpacity>
								</View>

								{
									wallet.length
										? <QRCode value={wallet} size={RFValue(120)} logoBackgroundColor='white' />
										: <ActivityIndicator size="large" color="#FFF" />
								}

								<Text
									onPress={() => {
										Clipboard.setString(amount.toString())
										ToastAndroid.show('Copiado', ToastAndroid.SHORT)
									}}
									style={{
										color: '#FFF',
										fontSize: RFValue(18),
										textAlign: 'center',
										marginVertical: 25,
										width: '100%'
									}}>
									Monto a pagar {payMode.toUpperCase()}
									<Text style={{ color: COLORS.colorSecondary, marginLeft: 15 }}>{amount.toFixed(11)}</Text>
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
										onPress={() => {
											Clipboard.setString(wallet)
											ToastAndroid.show('Copiado', ToastAndroid.SHORT)
										}}>
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

								<View style={{ width: '100%' }}>
									<Text style={{ marginTop: 15, color: '#FFF', fontSize: RFValue(14) }}>Hash de confirmacion</Text>
									<TextInput
										style={styleRow.inputs}
										onChangeText={hash => setHash(hash)}
										placeholder='Ingrese el HASH de confirmacion' />

									<Text style={{ marginTop: 15, color: '#FFF', fontSize: RFValue(14) }}>Cuenta destino</Text>

									<TextInput
										style={styleRow.inputs}
										onChangeText={text => setEmailTo(text)}
										defaultValue={emailTo || ''}
										placeholder='Correo destino' />

								</View>

								<View style={{
									borderBottomColor: COLORS.colorSecondary,
									borderBottomWidth: 1,
									flexDirection: 'row',
									justifyContent: 'center',
									paddingBottom: 20,
									width: '100%',
								}}>
									<TouchableHighlight style={styleRow.buttons} disabled={loadingHash} onPress={submit}>
										{
											loadingHash
												? <ActivityIndicator size="small" color="#FFF" />
												: <Text style={styleRow.textButtons}>Enviar</Text>
										}
									</TouchableHighlight>
								</View>
							</View>
						</ScrollView>

					</View>

				</View>
			</Modal>

			<ScrollView>
				<View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 25, width: '100%' }}>
					<Text style={{ fontSize: RFValue(24), color: '#FFF', textAlign: 'center' }}>
						Paquetes de recarga
                    </Text>

				</View>

				<View>
					{
						(loading && loadingGetAmount) ?
							<ActivityIndicator size="large" color="#FFF" />
							:
							<React.Fragment>
								<Text>Seleccionar paquete</Text>

								<View style={{ justifyContent: 'center', alignItems: 'center' }}>
									{
										data.map((item, index) => (
											<CoinsComponent
												data={item}
												onClick={() => {
													openBill(item)
													setPackageSelect(item)
												}}
												key={index} />
										))
									}
								</View>
							</React.Fragment>
					}
				</View>
			</ScrollView>

		</Background>
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