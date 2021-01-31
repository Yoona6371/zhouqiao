import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// 路由
import Index from '../pages/home/index';
import Tab from '../router/tab';
import ImageShow from '../pages/ImageShow';
import MyFocus from '../pages/personal/myFocus';
import Test from '../pages/test';
import LocalStorageUtils from '../utils/LocalStorageUtils';
import AccountSecurity from '../pages/personal/account-security';
import ServiceList from '../pages/personal/setting/service-list';
import DemandList from '../components/bussiness/DemandList'
import TopTabNavigator from '../components/common/TopTabNavigator/index'
import DemandDetails from '../pages/demand/demand-details';
import DemandSet from '../pages/demand';
import SettingIndex from '../pages/personal/setting';
import DadaEdit from '../pages/personal/setting/data-edit';
import detail from '../pages/personal/setting/service/detail'
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
        <Stack.Navigator initialRouteName="detail" headerMode={'none'}>
          <Stack.Screen name="Index" component={Index} />
          <Stack.Screen name="MyFocus" component={MyFocus} />
          <Stack.Screen name="Test" component={Test} />
          <Stack.Screen name="Tab" component={Tab} />
          <Stack.Screen name="ImageShow" component={ImageShow} />
          <Stack.Screen name="AccountSecurity" component={AccountSecurity} />
          <Stack.Screen name="ServiceList" component={ServiceList} />
          <Stack.Screen name="DemandList" component={DemandList} />
          <Stack.Screen name="TopTabNavigator" component={TopTabNavigator} />
          <Stack.Screen name="DemandDetails" component={DemandDetails} />
          <Stack.Screen name="SettingIndex" component={SettingIndex} />
          <Stack.Screen name="DemandSet" component={DemandSet} />
          <Stack.Screen name="DadaEdit" component={DadaEdit} />
          <Stack.Screen name="detail" component={detail} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Nav;
