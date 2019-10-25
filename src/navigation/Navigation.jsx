import { createSwitchNavigator, createAppContainer } from 'react-navigation'

// Import stacks
import PublicStack from './stacks/PublicStack'
import PrivateStack from './stacks/PrivateStack'

// INITIAL SCREEN
import StartupScreen from '../StartupScreen'
import ErrorScreen from '../screens/Error/Error'
import LocationScreen from '../screens/Location/LocationScreen'

const STACKS = createSwitchNavigator({
  Location: LocationScreen,
  Error: ErrorScreen,
  Public: PublicStack,
  Private: PrivateStack,
  Startup: StartupScreen
}, { initialRouteName: 'Startup' })

export default createAppContainer(STACKS)
