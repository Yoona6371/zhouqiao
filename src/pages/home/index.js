import React, { Component } from 'react';
import { View, Text } from 'react-native';
// import Http from '../../action/request';
import { inject } from 'mobx-react';
import { onDoublePress } from '../../utils/onDoublePress';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { pxToDp } from '../../utils/pxToDp';
import Pagination from '../../components/bussiness/Pagination';
const Tab = createMaterialTopTabNavigator();
import CommodityCard from '../../components/bussiness/CommodityCard';

@inject('RootStore')
class HomeTab extends Component {
  render() {
    return (
      <View>
        <Text>首页</Text>
      </View>
    );
  }
}
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [
        {
          name: 'Home',
          component: HomeTab,
        },
        {
          name: 'Settings',
          component: HomeTab,
        },
      ],
    };
    // console.log('this.props:', this.props);
  }

  componentDidMount() {
    //eg 全局数据调用，需要修改数据则需要添加obsever装饰器
    // console.log('全局数据调用：', this.props.RootStore);
    //eg 调用接口
    // this.props.RootStore.globalStore.allData.Http.test().then((res) => {
    //   console.log('get请求返回值：', res);
    // });
  }
  MyTabs = () => {
    let { pages } = this.state;
    return (
      <Tab.Navigator
        tabBarOptions={{
          indicatorStyle: {
            width: 5,
            height: 5,
            borderRadius: 5 / 2,
            left: pxToDp(750 / 4),
            transformX: '50%',
            backgroundColor: 'orange',
          },
        }}
      >
        {pages.map((v, i) => (
          <Tab.Screen name={v.name} component={v.component} key={i} />
        ))}
      </Tab.Navigator>
    );
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>首页</Text>
        <Text onPress={() => this.props.navigation.navigate('ImageShow')}>
          照片
        </Text>
        {this.MyTabs()}
        <Pagination
          navigation={this.props.navigation}
          pages={this.state.pages}
        />
      </View>
    );
  }
}
export default Index;
