import { createSwitchNavigator, createAppContainer } from 'react-navigation'

// Import stacks
import PublicStack from './stacks/PublicStack'
import PrivateStack from './stacks/PrivateStack'

// INITIAL SCREEN
import StartupScreen from '../StartupScreen'
import FinalTravelScreen from '../screens/Transports/FinalTravelScreen'

const STACKS = createSwitchNavigator({
  Public: PublicStack,
  Private: PrivateStack,
  Startup: StartupScreen,
  FinalTravel: FinalTravelScreen
}, { initialRouteName: 'Startup' })

export default createAppContainer(STACKS)
