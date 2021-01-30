import React, { Component } from 'react';
import { View, Text } from 'react-native';
import OrderCard from '../../components/bussiness/OrderCard';
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <OrderCard type={1} />
      </View>
    );
  }
}

export default App;
