import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// 路由

// 首页
import Index from '../pages/home';
import ImageShow from '../pages/ImageShow';

// 设计
import Design from '../pages/design';

// 消息
import Message from '../pages/message';

// 组件
import DemandList from '../components/bussiness/DemandList';
import TopTabNavigator from '../components/common/TopTabNavigator';
import Tab from '../router/tab';
import LocalStorageUtils from '../utils/LocalStorageUtils';
import SettinsIndex from '../pages/personal/setting';
// 需求
import DemandDetails from '../pages/demand/demand-details';

import DemandSet from '../pages/demand';

// 个人中心
import AccountSecurity from '../pages/personal/account-security';
import MyFocus from '../pages/personal/myFocus';
import ServiceList from '../pages/personal/setting/service-list';
import SettingIndex from '../pages/personal/setting';

import DadaEdit from '../pages/personal/setting/data-edit';
import Feedback from '../pages/personal/setting/feedback';
// 商品
import Commodity from '../pages/commodity';
//登录注册
import FindPassword from '../pages/users/findPassword';
import LoginAndRegister from '../pages/users/loginAndRegister';
// 测试
import Test from '../pages/test';
import Welfare from '../pages/home/welfare';
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
        <Stack.Navigator initialRouteName="Welfare" headerMode="none">
          <Stack.Screen name="Welfare" component={Welfare} />
          <Stack.Screen name="Index" component={Index} />
          <Stack.Screen name="MyFocus" component={MyFocus} />
          <Stack.Screen name="Test" component={Test} />
          <Stack.Screen name="Tab" component={Tab} />
          <Stack.Screen name="ImageShow" component={ImageShow} />
          <Stack.Screen name="AccountSecurity" component={AccountSecurity} />
          <Stack.Screen name="ServiceList" component={ServiceList} />
          <Stack.Screen name="DemandDetails" component={DemandDetails} />
          <Stack.Screen name="DemandSet" component={DemandSet} />
          <Stack.Screen name="DemandList" component={DemandList} />
          <Stack.Screen name="TopTabNavigator" component={TopTabNavigator} />
          <Stack.Screen name="SettingIndex" component={SettingIndex} />
          <Stack.Screen name="DadaEdit" component={DadaEdit} />
          <Stack.Screen name="Feedback" component={Feedback} />
          <Stack.Screen name="Commodity" component={Commodity} />
          <Stack.Screen name="Design" component={Design} />
          <Stack.Screen name="Message" component={Message} />
          <Stack.Screen name="FindPassword" component={FindPassword} />
          <Stack.Screen name="LoginAndRegister" component={LoginAndRegister} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Nav;
