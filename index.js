import 'react-native-gesture-handler'
import { AppRegistry, YellowBox } from 'react-native'
import Skiper from './Skiper'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => Skiper)

YellowBox.ignoreWarnings(['Setting a timer'])
