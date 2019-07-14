import { createSwitchNavigator } from '@react-navigation/core'
import { createBrowserApp } from "@react-navigation/web"
import Home from '../src/components/Home'
import Details from '../src/components/Details'

const NavStack = createSwitchNavigator({ Home, Details })
const Navigator = createBrowserApp(NavStack)

export default Navigator
