import React, { Component } from 'react';
import { View, Text } from 'react-native';
import DemandCard from '../../components/bussiness/demandCard';
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <DemandCard />
      </View>
    );
  }
}

export default App;
