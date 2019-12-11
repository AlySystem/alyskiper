import { createSwitchNavigator, createAppContainer } from 'react-navigation'

// Import stacks
import PublicStack from './stacks/PublicStack'
import PrivateStack from './stacks/PrivateStack'
import TabStack from './tabs/TabStack'

// INITIAL SCREEN
import StartupScreen from '../StartupScreen'
import FinalTravelScreen from '../screens/Transport/FinalTravelScreen'

const STACKS = createSwitchNavigator({
  Public: PublicStack,
  Private: PrivateStack,
  TabStack: TabStack,
  Startup: StartupScreen,
  FinalTravel: FinalTravelScreen
}, { initialRouteName: 'Startup' })

export default createAppContainer(STACKS)
