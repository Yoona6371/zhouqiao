import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// 路由
import Index from '../pages/home/index';
import Tabbar from '../router/tabbar';
import Test from '../pages/test';
import LocalStorageUtils from '../utils/LocalStorageUtils';

const Stack = createStackNavigator();

class Nav extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Tabbar" headerMode="none">
          <Stack.Screen name="Index" component={Index} />
          <Stack.Screen name="Test" component={Test} />
          <Stack.Screen name="Tabbar" component={Tabbar} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  async componentWillMount() {
    const userInfo = await LocalStorageUtils.get('userInfo');
    if (userInfo !== null) {
      // 1.重新获取用户信息
      // 2.存储到mobx中
    } else {
      // 跳转登录
      // this.props.navigate()
    }
  }
}

export default Nav;
