import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { pxToDp } from '../../utils/pxToDp';
import OrderCard from '../../components/bussiness/OrderCard';
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <OrderCard type={1} />

        <Text>Test页面</Text>
      </View>
    );
  }
}

export default App;
