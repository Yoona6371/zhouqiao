import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { pxToDp } from '../../utils/pxToDp';

class Test extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text>Test页面</Text>
      </View>
    );
  }
}

export default Test;
