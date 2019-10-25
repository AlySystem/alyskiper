import { createSwitchNavigator, createAppContainer } from 'react-navigation'

// Import stacks
import PublicStack from './stacks/PublicStack'
import PrivateStack from './stacks/PrivateStack'

// INITIAL SCREEN
import StartupScreen from '../StartupScreen'
import ErrorScreen from '../screens/Error/Error'

const STACKS = createSwitchNavigator({
  Public: PublicStack,
  Private: PrivateStack,
  Error: ErrorScreen,
  Startup: StartupScreen
}, { initialRouteName: 'Startup' })

export default createAppContainer(STACKS)
