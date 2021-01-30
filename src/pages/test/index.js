import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ['关注', 'PS/AI', '平面'],
    };
  }
  render() {
    const { name } = this.state;
    return <View />;
  }
}

export default Test;
