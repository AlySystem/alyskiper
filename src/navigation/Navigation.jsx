import { createSwitchNavigator, createAppContainer } from 'react-navigation'

// Import stacks
import PublicStack from './stacks/PublicStack'
import PrivateStack from './stacks/PrivateStack'

// INITIAL SCREEN
import StartupScreen from '../StartupScreen'

const STACKS = createSwitchNavigator({
  Public: PublicStack,
  Private: PrivateStack,
  Loader: StartupScreen
}, { initialRouteName: 'Loader' })

export default createAppContainer(STACKS)
