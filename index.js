/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import * as WeChat from 'react-native-wechat-lib';

WeChat.registerApp('wx8957021f38dd2c5f', 'Universal Links').then((r) =>
  console.log('微信注册成功'),
);

import NavigationHelper from './src/utils/navigationHelper';
NavigationHelper.init(NavigationHelper);
import Http from './src/action/request';
Http.init(Http);
console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => App);
