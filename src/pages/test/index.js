import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import HotCard from '../../components/bussiness/HotCard';
import UserXCard from '../../components/bussiness/UserXCard';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ScrollView>
        <Text>APP定制开发毅文教育教 学培训在线视频平台</Text>
        <HotCard />
        <UserXCard />
        <UserXCard />
        <UserXCard />
        <UserXCard />
        <UserXCard />
      </ScrollView>
    );
  }
}

export default App;
