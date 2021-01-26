import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// 路由
import Index from '../pages/home/index';
import Tabbar from '../router/tabbar';
import ImageShow from '../pages/ImageShow';
import MyFocus from '../pages/personal/myFocus';
import Test from '../pages/test';
import LocalStorageUtils from '../utils/LocalStorageUtils';

const Stack = createStackNavigator();

class Nav extends React.Component {
  constructor(props) {
    super(props);
    LocalStorageUtils.get('userInfo').then((userInfo) => {
      if (userInfo !== null) {
        // 1.重新获取用户信息
        // 2.存储到mobx中
      } else {
        // 跳转登录
        // this.props.navigate()
      }
    });
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="MyFocus"
          headerMode="none"
          cardStyle={{ backgroundColor: 'red' }}
        >
          <Stack.Screen name="Index" component={Index} />
          <Stack.Screen name="MyFocus" component={MyFocus} />
          <Stack.Screen name="Test" component={Test} />
          <Stack.Screen name="Tabbar" component={Tabbar} />
          <Stack.Screen name="ImageShow" component={ImageShow} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Nav;
