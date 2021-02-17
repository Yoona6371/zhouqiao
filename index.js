/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import NavigationHelper from './src/utils/navigationHelper';
NavigationHelper.init(NavigationHelper);
console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);
