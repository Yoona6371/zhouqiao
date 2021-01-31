import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TopTitle  from '../../components/common/TopTitle'
class Test extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        {/* <Text>test</Text> */}
        <TopTitle returnBack={this.sss} onPress={this.hello} title="购物列表" showBtn={true}></TopTitle>
      </View>
    );
  }
}

export default Test;
