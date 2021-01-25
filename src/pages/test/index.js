import React, { Component } from 'react';
import { View, Text } from 'react-native';
import HotCard from '../../components/bussiness/HotCard';
import UserXCard from '../../components/bussiness/UserXCard';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text>APP定制开发毅文教育教 学培训在线视频平台</Text>
        <HotCard />
        <UserXCard />
      </View>
    );
  }
}

export default App;
