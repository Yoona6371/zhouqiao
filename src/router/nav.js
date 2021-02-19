import React from 'react';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
// 路由
// 大图浏览
import ImageShow from '../pages/ImageShow';

// 设计
import Design from '../pages/design';

// 需求
import DemandDetails from '../pages/demand/demand-details';
import DemandSet from '../pages/demand';

// 个人中心
import AccountSecurity from '../pages/personal/setting/account-security';
import MyFocus from '../pages/personal/myFocus';
import ServiceList from '../pages/personal/setting/service/service-list';
import SettingIndex from '../pages/personal/setting';
import DataEdit from '../pages/personal/setting/data-edit';
import ServiceDetail from '../pages/personal/setting/service/detail';
import myDemand from '../pages/personal/myDemand';
import myCollect from '../pages/personal/myCollect';
import history from '../pages/personal/history';
import Feedback from '../pages/personal/setting/feedback';
import MyAddress from '../pages/personal/setting/myAddress';

// 案例/商品 详情页 评价页 售后页 订单列表
import CommodityDetail from '../pages/commodity/detail';
import EvaluateList from '../pages/personal/evaluate/evaluate-list';
import AfterSales from '../pages/personal/after-sales';
import OrderLists from '../pages/personal/order-list';

// 商品列表页
import CommodityList from '../pages/commodity';
import GoodsList from '../pages/commodity/goodsList';

// 搜索
import Search from '../pages/search';

// 公益
import Welfare from '../pages/home/welfare';

// 消息
import MessageNotice from '../pages/message/notice';
import MessageDetail from '../pages/message/detail';

// 测试
import Test from '../pages/test';
//登录
import LoginAndRegister from '../pages/users/loginAndRegister';
// Tab
import Tab from '../router/tab';
// 工具
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
      <NavigationContainer
        onStateChange={(state: NavigationState) => {
          //加入该行
          //这个是跳转了才去回调，所以不能利用routes来判断路由栈
          NavigationHelper.navRouters = state.routes;
        }}
      >
        <Stack.Navigator
          initialRouteName="Tab"
          headerMode={'none'}
          mode={'card'}
          screenOptions={(navigation) => {
            NavigationHelper.navigation = navigation.navigation;
          }}
        >
          {/*用户*/}
          {/*登录*/}
          <Stack.Screen
            name="LoginAndRegister"
            component={LoginAndRegister}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          {/*首页*/}

          <Stack.Screen
            name="Tab"
            component={Tab}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />

          {/*大图浏览*/}
          <Stack.Screen
            name="ImageShow"
            component={ImageShow}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />

          {/*设计
          设计师排行榜*/}

          {/*消息*/}

          {/*需求
            需求详情页
            发布需求页
          */}
          {/*需求详情页*/}
          <Stack.Screen
            name="DemandDetails"
            component={DemandDetails}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          {/*发布需求页*/}
          <Stack.Screen
            name="DemandSet"
            component={DemandSet}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />

          {/*测试*/}
          <Stack.Screen
            name="Test"
            component={Test}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          {/*我的关注*/}
          <Stack.Screen
            name="MyFocus"
            component={MyFocus}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />

          {/*个人中心*/}
          {/*账号安全*/}
          <Stack.Screen
            name="AccountSecurity"
            component={AccountSecurity}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          {/*服务协议列表*/}
          <Stack.Screen
            name="ServiceList"
            component={ServiceList}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          {/*设置页*/}
          <Stack.Screen
            name="SettingIndex"
            component={SettingIndex}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          {/*个人资料修改页*/}
          <Stack.Screen
            name="DataEdit"
            component={DataEdit}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          {/*地址管理*/}
          <Stack.Screen
            name="MyAddress"
            component={MyAddress}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          {/*服务协议详情页*/}
          <Stack.Screen
            name="ServiceDetail"
            component={ServiceDetail}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          {/*我的需求页*/}
          <Stack.Screen
            name="myDemand"
            component={myDemand}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          {/*我的收藏页*/}
          <Stack.Screen
            name="myCollect"
            component={myCollect}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          {/*我的浏览记录页*/}
          <Stack.Screen
            name="history"
            component={history}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          {/*反馈*/}
          <Stack.Screen
            name="Feedback"
            component={Feedback}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          {/*商品评价列表*/}
          <Stack.Screen
            name="EvaluateList"
            component={EvaluateList}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          {/*商品售后列表*/}
          <Stack.Screen
            name="AfterSales"
            component={AfterSales}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          {/*我的订单列表*/}
          <Stack.Screen
            name="OrderLists"
            component={OrderLists}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />

          {/*商品*/}
          {/*商品详情页*/}
          <Stack.Screen
            name="CommodityDetail"
            component={CommodityDetail}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          {/*商品列表*/}
          <Stack.Screen
            name="CommodityList"
            component={CommodityList}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
          <Stack.Screen
            name="GoodsList"
            component={GoodsList}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />

          {/*搜索页*/}
          <Stack.Screen
            name="search"
            component={Search}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />

          {/*公益列表*/}
          <Stack.Screen
            name="Welfare"
            component={Welfare}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />

          {/* 消息 */}
          <Stack.Screen name="MessageDetail" component={MessageDetail} />
          <Stack.Screen
            name="MessageNotice"
            component={MessageNotice}
            options={{
              ...TransitionPresets.SlideFromRightIOS,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Nav;
