import React, { Component } from 'react';
import { View, Text } from 'react-native';
// import Http from '../../action/request';
import { inject } from 'mobx-react';
import { onDoublePress } from '../../utils/onDoublePress';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Http from '../../action/request';
import { pxToDp } from '../../utils/pxToDp';
const Tab = createMaterialTopTabNavigator();

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
    this.state = {};
    console.log('qwe', this.props);
  }

  componentDidMount() {
    //eg 全局数据调用，需要修改数据则需要添加obsever装饰器
    // console.log('全局数据调用：', this.props.RootStore);
    //eg 调用接口
    // Http.test().then((res) => {
    // console.log('get请求返回值：', res);
    // });
  }
  MyTabs = () => {
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
        <Tab.Screen name="Home" component={HomeTab} />
        <Tab.Screen name="Settings" component={HomeTab} />
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
      </View>
    );
  }
}
export default Index;
