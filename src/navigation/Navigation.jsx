import { createSwitchNavigator, createAppContainer } from 'react-navigation'

// Import stacks
import PublicStack from './stacks/PublicStack'
import PrivateStack from './stacks/PrivateStack'

// INITIAL SCREEN
import StartupScreen from '../StartupScreen'
import ErrorScreen from '../screens/Error/Error'
import LocationScreen from '../screens/Location/LocationScreen'
import OfflineScreen from '../screens/Offline/OfflineScreen'
import FinalTravelScreen from '../screens/Transport/FinalTravelScreen'

const STACKS = createSwitchNavigator({
  Location: LocationScreen,
  Error: ErrorScreen,
  Offline: OfflineScreen,
  Public: PublicStack,
  Private: PrivateStack,
  Startup: StartupScreen,
  FinalTravel: FinalTravelScreen
}, { initialRouteName: 'Startup' })

export default createAppContainer(STACKS)
