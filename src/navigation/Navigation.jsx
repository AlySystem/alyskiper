import { createSwitchNavigator, createAppContainer } from 'react-navigation'

// Import stacks
import PublicStack from './stacks/PublicStack'
import PrivateStack from './stacks/PrivateStack'

// INITIAL SCREEN
import StartupScreen from '../StartupScreen'
import ErrorScreen from '../screens/Error/Error'
import FinalTravelScreen from '../screens/Transport/FinalTravelScreen'
import Location from '../screens/Location/LocationScreen'

const STACKS = createSwitchNavigator({
  Error: ErrorScreen,
  Public: PublicStack,
  Location: Location,
  Private: PrivateStack,
  Startup: StartupScreen,
  FinalTravel: FinalTravelScreen
}, { initialRouteName: 'Startup' })

export default createAppContainer(STACKS)
