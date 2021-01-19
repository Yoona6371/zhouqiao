import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { inject } from 'mobx-react';
@inject('RootStore')
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View>
        <Text>个人中心</Text>
        {/*  eg：全局数据调用*/}
        <Text>{this.props.RootStore}</Text>
      </View>
    );
  }
}
export default Index;
