import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Http from '../../action/request';
import { inject } from 'mobx-react';
@inject('RootStore')
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

  render() {
    return (
      <View>
        <Text>首页</Text>
        <Text onPress={() => this.props.navigation.navigate('ImageShow')}>
          照片
        </Text>
      </View>
    );
  }
}
export default Index;
