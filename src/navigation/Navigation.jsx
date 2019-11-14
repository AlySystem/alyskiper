import { createSwitchNavigator, createAppContainer } from 'react-navigation'

// Import stacks
import PublicStack from './stacks/PublicStack'
import PrivateStack from './stacks/PrivateStack'

// INITIAL SCREEN
import StartupScreen from '../StartupScreen'
import FinalTravelScreen from '../screens/Transports/FinalTravelScreen'
import Location from '../screens/Location/LocationScreen'

const STACKS = createSwitchNavigator({
  Public: PublicStack,
  Location: Location,
  Private: PrivateStack,
  Startup: StartupScreen,
  FinalTravel: FinalTravelScreen
}, { initialRouteName: 'Startup' })

export default createAppContainer(STACKS)
