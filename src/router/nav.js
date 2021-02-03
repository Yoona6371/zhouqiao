import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

// 路由

// 大图浏览
import ImageShow from '../pages/ImageShow';

// 设计
import Design from '../pages/design';

// 消息
import Message from '../pages/message';

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
import Evaluate from '../pages/personal/evaluate';
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

// 测试
import Test from '../pages/test';
//登录
import LoginAndRegister from '../pages/users/loginAndRegister';
// Tab
import Tab from '../router/tab';
// 工具
import LocalStorageUtils from '../utils/LocalStorageUtils';

// 排行榜页面/
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
          initialRouteName="Tab"
          headerMode={'none'}
          mode={'card'}
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        >
          {/*用户*/}
          {/*登录*/}
          <Stack.Screen name="LoginAndRegister" component={LoginAndRegister} />
          {/*首页*/}
          <Stack.Screen name="Tab" component={Tab} />

          {/*大图浏览*/}
          <Stack.Screen name="ImageShow" component={ImageShow} />

          {/*设计
          设计师排行榜*/}
          <Stack.Screen name="Design" component={Design} />

          {/*消息*/}

          {/*需求
            需求详情页
            发布需求页
          */}
          {/*需求详情页*/}
          <Stack.Screen name="DemandDetails" component={DemandDetails} />
          {/*发布需求页*/}
          <Stack.Screen name="DemandSet" component={DemandSet} />

          {/*测试*/}
          <Stack.Screen name="Test" component={Test} />
          {/*我的关注*/}
          <Stack.Screen name="MyFocus" component={MyFocus} />

          {/*个人中心*/}
          {/*账号安全*/}
          <Stack.Screen name="AccountSecurity" component={AccountSecurity} />
          {/*服务协议列表*/}
          <Stack.Screen name="ServiceList" component={ServiceList} />
          {/*设置页*/}
          <Stack.Screen name="SettingIndex" component={SettingIndex} />
          {/*个人资料修改页*/}
          <Stack.Screen name="DataEdit" component={DataEdit} />
          {/*地址管理*/}
          <Stack.Screen name="MyAddress" component={MyAddress} />
          {/*服务协议详情页*/}
          <Stack.Screen name="ServiceDetail" component={ServiceDetail} />
          {/*我的需求页*/}
          <Stack.Screen name="myDemand" component={myDemand} />
          {/*我的收藏页*/}
          <Stack.Screen name="myCollect" component={myCollect} />
          {/*我的浏览记录页*/}
          <Stack.Screen name="history" component={history} />
          {/*反馈*/}
          <Stack.Screen name="Feedback" component={Feedback} />
          {/*商品评价列表*/}
          <Stack.Screen name="Evaluate" component={Evaluate} />
          {/*商品售后列表*/}
          <Stack.Screen name="AfterSales" component={AfterSales} />
          {/*我的订单列表*/}
          <Stack.Screen name="OrderLists" component={OrderLists} />

          {/*商品*/}
          {/*商品详情页*/}
          <Stack.Screen name="CommodityDetail" component={CommodityDetail} />
          {/*商品列表*/}
          <Stack.Screen name="CommodityList" component={CommodityList} />
          <Stack.Screen name="GoodsList" component={GoodsList} />

          {/*搜索页*/}
          <Stack.Screen name="search" component={Search} />

          {/*公益列表*/}
          <Stack.Screen name="Welfare" component={Welfare} />

          {/* 消息 */}
          <Stack.Screen name="MessageNotice" component={MessageNotice} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Nav;
