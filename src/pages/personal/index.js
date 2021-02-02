import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { inject, observer } from 'mobx-react';
import { pxToDp } from '../../utils/pxToDp';
@inject('RootStore')
@observer
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View>
        <Text style={{ marginTop: pxToDp(80) }}>个人中心</Text>
        <Text
          style={{ marginTop: pxToDp(80) }}
          onPress={() => {
            this.props.navigation.navigate('ServiceList');
          }}
        >
          服务列表协议
        </Text>
        <Text
          style={{ marginTop: pxToDp(80) }}
          onPress={() => {
            this.props.navigation.navigate('SettingIndex');
          }}
        >
          设置
        </Text>
        <Text
          style={{ marginTop: pxToDp(80) }}
          onPress={() => {
            this.props.navigation.navigate('myDemand');
          }}
        >
          我的需求
        </Text>
        <Text
          style={{ marginTop: pxToDp(80) }}
          onPress={() => {
            this.props.navigation.navigate('myCollect');
          }}
        >
          我的收藏
        </Text>
        <Text
          style={{ marginTop: pxToDp(80) }}
          onPress={() => {
            this.props.navigation.navigate('history');
          }}
        >
          浏览历史
        </Text>
        <Text
          style={{ marginTop: pxToDp(80) }}
          onPress={() => {
            this.props.navigation.navigate('Evaluate');
          }}
        >
          评价中心
        </Text>
        <Text
          style={{ marginTop: pxToDp(80) }}
          onPress={() => {
            this.props.navigation.navigate('AfterSales');
          }}
        >
          售后
        </Text>
        <Text
          style={{ marginTop: pxToDp(80) }}
          onPress={() => {
            this.props.navigation.navigate('OrderLists');
          }}
        >
          订单列表
        </Text>
      </View>
    );
  }
}
export default Index;
