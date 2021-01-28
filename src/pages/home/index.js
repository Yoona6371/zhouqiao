import React, { Component } from 'react';
import { View, ScrollView, Text, FlatList } from 'react-native';
// import Http from '../../action/request';
import { inject } from 'mobx-react';
import { onDoublePress } from '../../utils/onDoublePress';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { pxToDp } from '../../utils/pxToDp';
import Pagination from '../../components/bussiness/Pagination';
const Tab = createMaterialTopTabNavigator();
import CommodityCard from '../../components/bussiness/CommodityCard';
import index from '../../mobx';

@inject('RootStore')
class HomeTab extends Component {
  state = {
    caseData: [
      { Title: '冯泽明的买卖', Commodity_type: 'Man', user_id: 'Agan的故事' },
      { Title: '冯泽明的买卖', Commodity_type: 'Man', user_id: 'Agan的故事' },
      { Title: '冯泽明的买卖', Commodity_type: 'Man', user_id: 'Agan的故事' },
      { Title: '冯泽明的买卖', Commodity_type: 'Man', user_id: 'Agan的故事' },
      { Title: '冯泽明的买卖', Commodity_type: 'Man', user_id: 'Agan的故事' },
      { Title: '冯泽明的买卖', Commodity_type: 'Man', user_id: 'Agan的故事' },
    ],
    shoppingData: [
      { prince: 666, Title: 'One Plus 7' },
      { prince: 666, Title: 'One Plus 7' },
      { prince: 666, Title: 'One Plus 7' },
      { prince: 666, Title: 'One Plus 7' },
      { prince: 666, Title: 'One Plus 7' },
      { prince: 666, Title: 'One Plus 7' },
    ],
  };
  render() {
    const { caseData, shoppingData } = this.state;
    return (
      <ScrollView>
        <Text>首页</Text>
        {/*案例列表开始*/}
        <FlatList
          data={caseData}
          numColumns={2}
          columnWrapperStyle={{ marginLeft: pxToDp(32) }}
          renderItem={({ item, index }) => (
            <CommodityCard
              Title={item.Title}
              user_id={item.user_id}
              Commodity_type={item.Commodity_type}
            />
          )}
        />
        {/*案例列表结束*/}
        {/*商品列表开始*/}
        <FlatList
          data={shoppingData}
          numColumns={2}
          columnWrapperStyle={{ marginLeft: pxToDp(32) }}
          renderItem={({ item, index }) => (
            <CommodityCard type={3} Title={item.Title} prince={item.prince} />
          )}
        />
        {/*商品列表结束*/}
      </ScrollView>
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
